'use server';

import { ServerActionResponse } from '@/common/network/response';
import { ZodUtils } from '@/lib/zod-utils';
import { S3Service } from '@/server/aws/s3-service';
import connectMongo from '@/server/database/mongoose';
import Template from '@/server/models/Template';
import { CreateTemplateType, CreateTemplateSchema } from '@/types/templates/template.schema';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

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

		const { name, schema: jsonSchema, file, description, category } = parsedPayload.data;

		// Generate a unique key for the file
		const key = uuidv4();
		const uniqueKey = `${key}-${file.name}`;

		// Upload file to S3
		const fileBuffer = Buffer.from(await file.arrayBuffer());
		await S3Service.uploadFile(uniqueKey, fileBuffer, file.type);

		// Connect to MongoDB
		await connectMongo();

		// Create new template
		const newTemplate = new Template({
			name: name,
			key: uniqueKey,
			jsonSchema: jsonSchema,
			description: description,
			category: category,
		});

		// Save to database
		const savedTemplate = await newTemplate.save();

		// Revalidate the templates page to show the new template
		revalidatePath('/van-ban');

		return {
			success: true,
			data: {
				id: savedTemplate._id,
				name: savedTemplate.name,
				key: savedTemplate.key,
				description: savedTemplate.description,
				category: savedTemplate.category,
				createdAt: savedTemplate.createdAt,
				updatedAt: savedTemplate.updatedAt,
			}
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
