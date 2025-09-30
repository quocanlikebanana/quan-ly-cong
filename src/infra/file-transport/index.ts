import { S3Service } from "./s3-service";
import fs from "fs";
import path from "path";
import { extension } from "mime-types";

const SERVER_FILE_PATH = path.resolve(process.cwd(), 'src', 'server', 'uploads');
const DOCX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const getLocalFilePath = (key: string) => path.resolve(SERVER_FILE_PATH, `${key}.${extension(DOCX_MIME_TYPE) || 'docx'}`);

export class FileTransport {
	static async readDocxFile(key: string, from: "s3" | "local" = "local"): Promise<string> {
		if (from === "s3") {
			return this.readFromS3(key);
		} else {
			return this.readFromLocal(key);
		}
	}

	static async writeDocxFile(fileContent: Buffer | Uint8Array | string, key: string, to: "s3" | "local" = "local") {
		if (to === "s3") {
			return this.writeToS3(fileContent, key);
		}
		return this.writeToLocal(fileContent, key);
	}

	private static async readFromS3(key: string): Promise<string> {
		const stream = await S3Service.getFileStream(key);
		return new Promise((resolve, reject) => {
			const chunks: Uint8Array[] = [];
			stream.on('data', (chunk) => chunks.push(chunk));
			stream.on('error', reject);
			stream.on('end', () => {
				const buffer = Buffer.concat(chunks);
				resolve(buffer.toString('base64'));
			});
		});
	}

	private static async readFromLocal(key: string): Promise<string> {
		const localFilePath = getLocalFilePath(key);
		const fileBinary = fs.readFileSync(localFilePath);
		return fileBinary.toString('base64');
	}

	private static writeToS3(fileContent: Buffer | Uint8Array | string, key: string) {
		return S3Service.uploadFile(key, fileContent, DOCX_MIME_TYPE);
	}

	private static writeToLocal(fileContent: Buffer | Uint8Array | string, key: string) {
		if (!fs.existsSync(SERVER_FILE_PATH)) {
			fs.mkdirSync(SERVER_FILE_PATH, { recursive: true });
		}
		const filePath = getLocalFilePath(key);
		fs.writeFileSync(filePath, fileContent, { encoding: 'base64' });
		return true;
	}
}