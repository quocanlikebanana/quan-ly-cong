'use server';

import { ServerActionResponse } from '@/types/server-actions/server-action-response';
import { CreateTemplateActionType, CreateTemplateActionSchema } from '@/features/templates/actions/create-template/create-template.schema';
import { revalidatePath } from 'next/cache';
import { TemplateMongoRepository } from '@/models/template-model/mongo-repo';
import { routes } from '@/client/routes';
import { TemplateFileService } from '@/services/template-file/template-file.service';
import { ServerActionBuilder } from '@/types/server-actions/server-action-builder';


/**
 * Server action to create a template.
 * @param payload - The template data to create
 * @returns Promise<CreateTemplateResponse> - The result of the operation
 */

const _createTemplateAction = async (_: unknown, payload: CreateTemplateActionType): Promise<ServerActionResponse> => {
	// Save files (local or s3)
	const { key } = await TemplateFileService.getInstance().write(payload.file)

	// Save to database
	const repo = new TemplateMongoRepository();
	const result = await repo.create({
		...payload,
		storage: {
			storageType: 'local',
			key: key,
			orginalFileName: payload.file.name,
		}
	});

	// Revalidate the templates page to show the new template
	revalidatePath(routes.van_ban.INDEX);

	return {
		success: true,
		data: { id: result.id }
	};
}

const createTemplateAction = ServerActionBuilder.init(_createTemplateAction)
	.withParamsValidator(CreateTemplateActionSchema)
	.withTryCatch()
	.build();

export default createTemplateAction;
