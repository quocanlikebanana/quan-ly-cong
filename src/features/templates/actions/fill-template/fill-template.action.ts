'use server';

import { ServerActionResponse } from '@/types/server-actions/server-action-response';
import { ZodUtils } from '@/lib/utils/zod-utils';
import { FillTemplateType, FillTemplateSchema } from '@/features/templates/actions/fill-template/fill-template.schema';
import { FileTransport } from '@/infra/file-transport';
import { TemplateMongoRepository } from '@/models/template-model/mongo-repo';
import { DocumentGenerator } from '@/lib/document-generator/document-generator';
import { ServerActionBuilder } from '@/types/server-actions/server-action-builder';


/** 
 * Server action to fill a template with provided data
 */
const _fillTemplateAction = async (_: unknown, payload: FillTemplateType): Promise<ServerActionResponse> => {
    const repo = new TemplateMongoRepository();
    const template = await repo.findById(payload.data.templateId);
    if (!template) {
        return {
            success: false,
            error: 'Mẫu văn bản không tồn tại',
        };
    }
    // Read the template file
    const fileContentBase64 = await FileTransport.readDocxFile(template.storage.path, template.storage.storageType);
    const fileBuffer = Buffer.from(fileContentBase64, 'base64');
    // Generate the filled document
    const filledDocumentBuffer = await DocumentGenerator.fillTemplate(fileBuffer, parsedPayload.data.fields);
    const filledDocumentBase64 = filledDocumentBuffer.toString('base64');
    return {
        success: true,
        data: {
            file: filledDocumentBase64,
            fileName: `filled-${template.name}.docx`,
        },
    };
}

const fillTemplateAction = ServerActionBuilder.init(_fillTemplateAction)
    .withParamsValidator(FillTemplateSchema)
    .withTryCatch()
    .build();

export default fillTemplateAction;