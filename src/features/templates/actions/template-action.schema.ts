import z from "zod";

export const TemplateFieldCoreSchema = z.object({
    type: z.string().min(1, "Loại là bắt buộc"),
    key: z.string().min(1, "Khóa là bắt buộc"),
    label: z.string().min(1, "Nhãn là bắt buộc"),
    description: z.string().optional(),
    order: z.number().min(0).optional(),
    uiMetadata: z.record(z.string(), z.unknown()).optional(),
    renderMetadata: z.record(z.string(), z.unknown()).optional(),
});

export type TemplateFieldCoreType = z.infer<typeof TemplateFieldCoreSchema>;
