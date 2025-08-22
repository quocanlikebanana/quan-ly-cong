import { DomainError } from "@/common/error/domain-error";
import { DocxService } from "@/lib/docx";
import { S3Service } from "@/server/aws/s3";
import { randomUUID } from "crypto";

export class TemplateService {
	static async uploadTemplate(file: File): Promise<{ key: string }> {
		const mimetype = file.type;
		if (!mimetype.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
			throw new DomainError("Invalid file type. Please upload a DOCX file.");
		}
		if (file.size > 10 * 1024 * 1024) {
			throw new DomainError("File size exceeds the limit of 10 MB.");
		}
		const key = randomUUID() + '-' + file.name;
		const buffer = await file.arrayBuffer();
		await S3Service.uploadFile(key, Buffer.from(buffer), file.type);
		return { key };
	}

	static async renderTemplate(key: string, data: any): Promise<Buffer> {
		const fileStream = await S3Service.getFileStream(key);
		const chunks: Buffer[] = [];
		for await (const chunk of fileStream) {
			chunks.push(chunk);
		}
		const docFileBinary = Buffer.concat(chunks).toString("binary");
		return DocxService.renderDocxFile(data, docFileBinary);
	}
}

