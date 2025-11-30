// 'use server';

// import { ServerActionResponse } from '@/types/server-action-response';
// import { ZodUtils } from '@/lib/utils/zod-utils';
// import { FillTemplateType, FillTemplateSchema } from '@/features/templates/actions/fill-template/fill-template.schema';
// import { FileTransport } from '@/infra/file-transport';
// import { TemplateMongoRepository } from '@/models/template-model/mongo-repo';
// import { DocumentGenerator } from '@/lib/document-generator/document-generator';


// /** * Server action to fill a template with provided data.
//  * @param payload - The data to fill the template
//  * @returns Promise<ServerActionResponse> - The result of the operation */
// export async function fillTemplateAction(payload: FillTemplateType): Promise<ServerActionResponse> {
//     try {
//         const parsedPayload = FillTemplateSchema.safeParse(payload);
//         if (!parsedPayload.success) {
//             return {
//                 success: false,
//                 error: ZodUtils.collectErrors(parsedPayload.error),
//             };
//         }
//         const repo = new TemplateMongoRepository();
//         const template = await repo.findById(parsedPayload.data.templateId);
//         if (!template) {
//             return {
//                 success: false,
//                 error: 'Mẫu văn bản không tồn tại',
//             };
//         }
// // Read the template file
//         const fileContentBase64 = await FileTransport.readDocxFile(template.storage.path, template.storage.storageType);
//         const fileBuffer = Buffer.from(fileContentBase64, 'base64');
// // Generate the filled document
//         const filledDocumentBuffer = await DocumentGenerator.fillTemplate(fileBuffer, parsedPayload.data.fields);
//         const filledDocumentBase64 = filledDocumentBuffer.toString('base64');
//         return {
//             success: true,
//             data: {
//                 file: filledDocumentBase64,
//                 fileName: `filled-${template.name}.docx`,
//             },
//         };
//     }
//     catch (error) {
//         console.error('Error filling template:', error);
//         return {
//             success: false,
//             error: 'Đã xảy ra lỗi khi điền mẫu văn bản',
//         };
//     }
// }

