import z from "zod";

export const RenderTextFieldMetaSchema = z.object({
    prefix: z.string().optional(),
    suffix: z.string().optional(),
}).optional();
export type RenderTextFieldMetaType = z.infer<typeof RenderTextFieldMetaSchema>;

export const RenderDateFieldMetaSchema = z.object({
    format: z.enum([
        "dd/MM/yyyy",
        "ngày__, tháng__, năm____",
    ]).default("dd/MM/yyyy")
}).optional();
export type RenderDateFieldMetaType = z.infer<typeof RenderDateFieldMetaSchema>;

export const RenderArrayFieldMetaSchema = z.object({
    prefix: z.string().optional(),
    suffix: z.string().optional(),
}).optional();
export type RenderArrayFieldMetaType = z.infer<typeof RenderArrayFieldMetaSchema>;
