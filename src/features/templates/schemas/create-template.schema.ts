import z from "zod";
import { TemplateFieldCoreSchema } from "./common/template-field-core.schema";

export const CreateTemplateSchema = z.object({
	name: z.string().min(1, 'Tên mẫu là bắt buộc'),
	fields: z.array(TemplateFieldCoreSchema).min(1, 'Vui lòng thêm ít nhất một trường vào mẫu'),
	file: z.file()
		.min(1, 'Vui lòng chọn một tệp')
		.max(10 * 1024 * 1024, 'Kích thước tệp không được vượt quá 10 MB')
		.mime('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Vui lòng chọn tệp DOCX'),
	description: z.string().optional(),
	category: z.string().optional(),
});

export type CreateTemplateType = z.infer<typeof CreateTemplateSchema>;

