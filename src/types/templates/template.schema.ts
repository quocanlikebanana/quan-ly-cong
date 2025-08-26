import z from "zod";

export const CreateTemplateSchema = z.object({
	name: z.string().min(1, 'Tên mẫu là bắt buộc'),
	schema: z.any().optional().refine((val) => {
		if (val === null || val === undefined) return true;
		
		try {
			// If it's already an object, validate it has basic schema structure
			if (typeof val === 'object') {
				return val.type !== undefined || val.properties !== undefined;
			}
			
			// If it's a string, try to parse it
			if (typeof val === 'string') {
				const parsed = JSON.parse(val);
				return typeof parsed === 'object' && parsed !== null;
			}
			
			return false;
		} catch {
			return false;
		}
	}, 'Schema JSON không hợp lệ'),
	file: z.file()
		.min(1, 'Vui lòng chọn một tệp')
		.max(10 * 1024 * 1024, 'Kích thước tệp không được vượt quá 10 MB')
		.mime('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Vui lòng chọn tệp DOCX'),
	description: z.string().optional(),
	category: z.string().optional(),
});

export type CreateTemplateType = z.infer<typeof CreateTemplateSchema>;

