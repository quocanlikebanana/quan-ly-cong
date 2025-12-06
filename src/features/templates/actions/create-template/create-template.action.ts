'use server';

import { ServerActionResponse } from '@/types/server-action-response';
import { ZodUtils } from '@/lib/utils/zod-utils';
import { CreateTemplateType, CreateTemplateSchema } from '@/features/templates/actions/create-template/create-template.schema';
import { revalidatePath } from 'next/cache';
import { TemplateMongoRepository } from '@/models/template-model/mongo-repo';
import { routes } from '@/client/routes';
import { TemplateFileService } from '@/services/template-file/template-file.service';

/**
 * Server action to create a template.
 * @param payload - The template data to create
 * @returns Promise<CreateTemplateResponse> - The result of the operation
 */
export async function createTemplateAction(_: unknown, payload: CreateTemplateType): Promise<ServerActionResponse> {
	try {
		const parsedPayload = CreateTemplateSchema.safeParse(payload);
		if (!parsedPayload.success) {
			return {
				success: false,
				error: ZodUtils.collectErrors(parsedPayload.error),
			};
		}

		// Save files (local or s3)
		const { key } = await TemplateFileService.getInstance().write(parsedPayload.data.file)

		// Save to database
		const repo = new TemplateMongoRepository();
		const result = await repo.create({
			...parsedPayload.data,
			storage: {
				storageType: 'local',
				key: key,
				orginalFileName: parsedPayload.data.file.name,
			}
		});

		// Revalidate the templates page to show the new template
		revalidatePath(routes.van_ban.INDEX);

		return {
			success: true,
			data: { id: result.id }
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
