import z from "zod";
import { TemplateFieldCoreSchema } from "./template-action.schema";

export const CreateTemplateSchema = z.object({
	name: z.string().min(1, 'Tên mẫu là bắt buộc'),
	description: z.string().optional(),
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
	file: z.file()
		.min(1, 'Vui lòng chọn một tệp')
		.max(10 * 1024 * 1024, 'Kích thước tệp không được vượt quá 10 MB')
		.mime('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Vui lòng chọn tệp DOCX'),
	fields: z.array(TemplateFieldCoreSchema).min(1, 'Vui lòng thêm ít nhất một trường vào mẫu'),
});

export type CreateTemplateType = z.infer<typeof CreateTemplateSchema>;

