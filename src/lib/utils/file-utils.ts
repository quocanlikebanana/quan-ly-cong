export class FileUtils {
    static base64ToBinary(base64: string): string {
        const binaryString = atob(base64);
        return binaryString;
    }

    static bufferToBase64(buffer: Buffer<ArrayBufferLike>): string {
        return buffer.toString("base64");
    }

    static base64ToBuffer(base64: string): Buffer<ArrayBufferLike> {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return Buffer.from(bytes.buffer);
    }
}

