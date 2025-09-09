import { S3Service } from "../aws/s3-service";
import fs from "fs";
import path from "path";

const SERVER_FILE_PATH = path.resolve(process.cwd(), 'src', 'server', 'uploads');

export class DocxServiceServer {
	static async readDocxFile(name: string, from: "s3" | "local"): Promise<string> {
		if (from === "s3") {
			return this.readFromS3(name);
		} else {
			return this.readFromLocal(name);
		}
	}

	private static async readFromS3(name: string): Promise<string> {
		const stream = await S3Service.getFileStream(name);
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

	private static async readFromLocal(name: string): Promise<string> {
		const fileBinary = fs.readFileSync(path.resolve(SERVER_FILE_PATH, name));
		return fileBinary.toString('base64');
	}
}