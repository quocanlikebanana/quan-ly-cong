import z from "zod";

export const TextFieldRenderMetaSchema = z.object({
    prefix: z.string().optional(),
    suffix: z.string().optional(),
}).optional();
export type TextFieldRenderMetaType = z.infer<typeof TextFieldRenderMetaSchema>;

export const DateFieldRenderMetaSchema = z.object({
    format: z.enum([
        "dd/MM/yyyy",
        "ngày__, tháng__, năm____",
    ]).default("dd/MM/yyyy")
}).optional();
export type DateFieldRenderMetaType = z.infer<typeof DateFieldRenderMetaSchema>;

export const ArrayFieldRenderMetaSchema = z.object({
    prefix: z.string().optional(),
    suffix: z.string().optional(),
}).optional();
export type ArrayFieldRenderMetaType = z.infer<typeof ArrayFieldRenderMetaSchema>;
