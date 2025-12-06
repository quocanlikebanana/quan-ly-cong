export interface IFileTransport {
    readDocxFile(key: string): Promise<string>;
    writeDocxFile(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean>;
    readPDFFile?(key: string): Promise<string>;
    writePdfFile?(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean>;
    readImagePreviewFile?(key: string): Promise<string>;
    writeImagePreviewFile?(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean>;
}