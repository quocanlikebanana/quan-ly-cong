export class FileUtils {
    static base64ToBinary(base64: string): string {
        const binaryString = atob(base64);
        return binaryString;
    }

    static bufferToBase64(buffer: Buffer<ArrayBufferLike>): string {
        return buffer.toString("base64");
    }
}

