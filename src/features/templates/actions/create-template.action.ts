'use server';

import { ServerActionResponse } from '@/common/network/response';
import { ZodUtils } from '@/client/utils/zod-utils';
import { CreateTemplateType, CreateTemplateSchema } from '@/features/templates/actions/create-template.schema';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { FileTransport } from '@/infra/file-transport';
import { TemplateMongoRepository } from '@/models/template-model/mongo-repo';

/**
 * Server action to create a template.
 * @param payload - The template data to create
 * @returns Promise<CreateTemplateResponse> - The result of the operation
 */
export async function createTemplateAction(payload: CreateTemplateType): Promise<ServerActionResponse> {
	try {
		const parsedPayload = CreateTemplateSchema.safeParse(payload);
		if (!parsedPayload.success) {
			return {
				success: false,
				error: ZodUtils.collectErrors(parsedPayload.error),
			};
		}


		// Generate a unique key for the file
		const id = uuidv4();
		const uniqueKey = `${id}-${parsedPayload.data.file.name}`;

		// Upload file
		const fileBuffer = Buffer.from(await parsedPayload.data.file.arrayBuffer());
		await FileTransport.writeDocxFile(fileBuffer, uniqueKey, "local");

		// Save to database
		const repo = new TemplateMongoRepository();
		await repo.create({
			...parsedPayload.data,
			id: id
		});

		// Revalidate the templates page to show the new template
		revalidatePath('/van-ban');

		return {
			success: true,
			data: { id: id }
		};

	} catch (error) {
		console.error('Error creating template:', error);

		// Handle specific MongoDB errors
		if (error instanceof Error) {
			if (error.name === 'ValidationError') {
				return {
					success: false,
					error: 'Validation failed: ' + error.message
				};
			}
			if (
				error.name === 'MongoServerError' &&
				(error as { code?: number }).code === 11000
			) {
				return {
					success: false,
					error: 'A template with this key already exists'
				};
			}
		}

		return {
			success: false,
			error: 'Failed to create template. Please try again.'
		};
	}
}
