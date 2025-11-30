export interface IFileTransport {
    readDocxFile(key: string): Promise<string>;
    writeDocxFile(fileContent: Buffer | Uint8Array | string, key: string): Promise<boolean>;
}