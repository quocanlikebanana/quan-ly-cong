import { IFileTransport } from "./file-transport.i";
import fs from "fs";
import path from "path";
import { extension } from "mime-types";

const SERVER_FILE_PATH = path.resolve(process.cwd(), 'src', 'server', 'uploads');
const DOCX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const getLocalFilePath = (key: string) => path.resolve(SERVER_FILE_PATH, `${key}.${extension(DOCX_MIME_TYPE) || 'docx'}`);

export class LocalFileTransport implements IFileTransport {
    async readDocxFile(key: string): Promise<string> {
        const localFilePath = getLocalFilePath(key);
        const fileBinary = fs.readFileSync(localFilePath);
        return fileBinary.toString('base64');
    }

    async writeDocxFile(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean> {
        if (!fs.existsSync(SERVER_FILE_PATH)) {
            fs.mkdirSync(SERVER_FILE_PATH, { recursive: true });
        }
        const filePath = getLocalFilePath(key);
        fs.writeFileSync(filePath, fileContent, { encoding: 'base64' });
        return true;
    }
}
