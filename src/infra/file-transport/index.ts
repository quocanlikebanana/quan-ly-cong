import { IFileTransport } from "./file-transport.i";
import { LocalFileTransport } from "./local-file-transport";
import { S3FileTransport } from "./s3-file-transport";

export class FileTransport {
	private static localTransport = new LocalFileTransport();
	private static s3Transport = new S3FileTransport();

	static async readDocxFile(key: string, from: "s3" | "local" = "local"): Promise<string> {
		const transport = this.getTransport(from);
		return transport.readDocxFile(key);
	}

	static async writeDocxFile(fileContent: Buffer | Uint8Array | string, key: string, to: "s3" | "local" = "local") {
		const transport = this.getTransport(to);
		return transport.writeDocxFile(fileContent, key);
	}

	private static getTransport(type: "s3" | "local"): IFileTransport {
		return type === "s3" ? this.s3Transport : this.localTransport;
	}
}
