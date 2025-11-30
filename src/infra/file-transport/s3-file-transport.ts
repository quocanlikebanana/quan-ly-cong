import { IFileTransport } from "./file-transport.i";
import { S3Service } from "./s3-service";

const DOCX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export class S3FileTransport implements IFileTransport {
    async readDocxFile(key: string): Promise<string> {
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

    async writeDocxFile(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean> {
        await S3Service.uploadFile(key, fileContent, DOCX_MIME_TYPE);
        return true;
    }
}
