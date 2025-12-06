// This file is only meant to be used in a server environment
// Because it uses Node.js 'fs' module and file system access is not available in the browser

import "server-only";

import { IFileTransport } from "./file-transport.i";
import fs from "fs";
import path from "path";

const SERVER_FILE_PATH = path.resolve(process.cwd(), 'src', 'server', 'uploads');

const FileTypeAsConst = {
    template: "template.docx",
    preview: "preview.png",
    display: "display.pdf"
} as const;

export class LocalFileTransport implements IFileTransport {
    async readDocxFile(key: string): Promise<string> {
        const filePath = path.resolve(SERVER_FILE_PATH, key, FileTypeAsConst.template);
        const fileBinary = fs.readFileSync(filePath);
        return fileBinary.toString('base64');
    }

    async writeDocxFile(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean> {
        if (!fs.existsSync(SERVER_FILE_PATH)) {
            fs.mkdirSync(SERVER_FILE_PATH, { recursive: true });
        }
        const filePath = path.resolve(SERVER_FILE_PATH, key, FileTypeAsConst.template);
        fs.writeFileSync(filePath, fileContent, { encoding: 'base64' });
        return true;
    }

    async readPDFFile(key: string): Promise<string> {
        const localFilePath = path.resolve(SERVER_FILE_PATH, key, FileTypeAsConst.display);
        const fileBinary = fs.readFileSync(localFilePath);
        return fileBinary.toString('base64');
    }

    async writePdfFile(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean> {
        if (!fs.existsSync(SERVER_FILE_PATH)) {
            fs.mkdirSync(SERVER_FILE_PATH, { recursive: true });
        }
        const filePath = path.resolve(SERVER_FILE_PATH, key, FileTypeAsConst.display);
        fs.writeFileSync(filePath, fileContent, { encoding: 'base64' });
        return true;
    }

    async readImagePreviewFile(key: string): Promise<string> {
        const filePath = path.resolve(SERVER_FILE_PATH, key, FileTypeAsConst.preview);
        const fileBinary = fs.readFileSync(filePath);
        return fileBinary.toString('base64');
    }

    async writeImagePreviewFile(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean> {
        if (!fs.existsSync(SERVER_FILE_PATH)) {
            fs.mkdirSync(SERVER_FILE_PATH, { recursive: true });
        }
        const filePath = path.resolve(SERVER_FILE_PATH, key, FileTypeAsConst.preview);
        fs.writeFileSync(filePath, fileContent, { encoding: 'base64' });
        return true;
    }
}
