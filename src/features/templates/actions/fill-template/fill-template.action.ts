'use server';

import { ServerActionResponse } from '@/types/server-actions/server-action-response';
import { FillTemplateActionSchema, FillTemplateActionType } from '@/features/templates/actions/fill-template/fill-template.schema';
import { TemplateMongoRepository } from '@/models/template-model/mongo-repo';
import { ServerActionBuilder } from '@/types/server-actions/server-action-builder';
import { TemplateFileService } from '@/services/template-file/template-file.service';
import { TemplateRenderService } from '@/services/template-render/template-render.service';
import { RandomUtils } from '@/lib/utils/random-utils';
import { TempFileBufferInfra } from '@/infra/temp-file-buffer/temp-file-buffer.infra';

/** 
 * Server action to fill a template with provided data
 */
const _fillTemplateAction = async (_: unknown, payload: FillTemplateActionType): Promise<ServerActionResponse<{ tempFileName: string }>> => {
    const repo = new TemplateMongoRepository();
    const template = await repo.findById(payload.templateId);
    if (!template) {
        return {
            success: false,
            error: 'Mẫu văn bản không tồn tại',
        };
    }
    const docxBuffer = TemplateFileService.getInstance().readTemplate(template.storage.key);
    if (!docxBuffer) {
        return {
            success: false,
            error: 'Không thể đọc tệp mẫu văn bản',
        };
    }

    const renderedDocxBuffer = TemplateRenderService.render(payload.fieldMap, docxBuffer);
    const uuid = RandomUtils.generateRandomUUID();
    const tempFileName = `${uuid}-${template.name}.docx`;
    await TempFileBufferInfra.getInstance().writeFileBuffer(tempFileName, renderedDocxBuffer);

    return {
        success: true,
        data: {
            tempFileName,
        },
    };
}

const fillTemplateAction = ServerActionBuilder.init(_fillTemplateAction)
    .withParamsValidator(FillTemplateActionSchema)
    .withTryCatch()
    .build();

export default fillTemplateAction;