import z from "zod";

export const CreateTemplateSchema = z.object({
	name: z.string().min(1, 'Tên mẫu là bắt buộc'),
	schema: z.json(),
	file: z.file()
		.min(1, 'Vui lòng chọn một tệp')
		.max(10 * 1024 * 1024, 'Kích thước tệp không được vượt quá 10 MB')
		.mime('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Vui lòng chọn tệp DOCX'),
	description: z.string().optional(),
	category: z.string().optional(),
});

export type CreateTemplateType = z.infer<typeof CreateTemplateSchema>;

