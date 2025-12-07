/**
 * This file is only meant to be used in a server environment
 * Because it uses Node.js 'fs' module and file system access is not available in the browser
 */
import "server-only";

import fs from "fs";
import path from "path";

const SERVER_FILE_PATH = path.resolve(process.cwd(), 'src', 'server', 'uploads');

// D:\project\quan-ly-cong\quan-ly-cong\src\server\uploads

export class LocalFileInfra {
    static readFile(
        /**
         * Relative path from SERVER_FILE_PATH 
         * (which is the base path defined in LocalFileInfra)
         */
        relativePath: string
    ): ArrayBuffer | null {
        const filePath = path.resolve(SERVER_FILE_PATH, relativePath);
        if (!fs.existsSync(filePath)) {
            return null;
        }
        const fileBinary = fs.readFileSync(filePath);
        return fileBinary.buffer;
    }

    static writeFile(
        fileContent: Buffer | Uint8Array | string,
        /**
         * Relative path from SERVER_FILE_PATH
         * (which is the base path defined in LocalFileInfra)
         */
        relativePath: string
    ): void {
        const absolutePath = path.resolve(SERVER_FILE_PATH, relativePath);
        const dirPath = path.dirname(absolutePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(absolutePath, fileContent, { encoding: 'base64' });
    }
}
