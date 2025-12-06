/**
 * This module handles file operations in cloud storage (AWS S3).
 * Should only be used in a server environment.
 */
import "server-only";

import configs from "@/lib/configs";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({});
const BUCKET_NAME = configs.aws.s3.bucketName;

export class CloudFileInfra {
	static async uploadFile(key: string, body: Buffer | Uint8Array | string, contentType?: string): Promise<void> {
		await s3Client.send(
			new PutObjectCommand({
				Bucket: BUCKET_NAME,
				Key: key,
				Body: body,
				ContentType: contentType,
			})
		);
	}

	static async getFileStream(key: string): Promise<Readable> {
		const response = await s3Client.send(
			new GetObjectCommand({
				Bucket: BUCKET_NAME,
				Key: key,
			})
		);
		return response.Body as Readable;
	}

	static async deleteFile(key: string) {
		await s3Client.send(
			new DeleteObjectCommand({
				Bucket: BUCKET_NAME,
				Key: key,
			})
		);
		return true;
	}
}
