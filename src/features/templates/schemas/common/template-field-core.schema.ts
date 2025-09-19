import z from "zod";

export const TemplateFieldCoreSchema = z.object({
    key: z.string().min(1, "Khóa là bắt buộc"),
    label: z.string().min(1, "Nhãn là bắt buộc"),
    placeholder: z.string().optional(),
    defaultValue: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['string', 'number', 'boolean']).default('string'),
    order: z.number().min(0).default(0),
});

export type TemplateFieldCoreType = z.infer<typeof TemplateFieldCoreSchema>;

