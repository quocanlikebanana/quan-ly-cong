import z from "zod";

export const TemplateFieldCoreSchema = z.object({
    key: z.string().min(1, "Khóa là bắt buộc"),
    label: z.string().min(1, "Nhãn là bắt buộc"),
    placeholder: z.string().optional(),
    defaultValue: z.string().optional(),
    order: z.number().min(0),
});

export type TemplateFieldCoreType = z.infer<typeof TemplateFieldCoreSchema>;
