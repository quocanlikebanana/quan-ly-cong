import z from "zod";

export const TextFieldUIMetaSchema = z.object({
    selectionSet: z.string().optional(),
});

export const ArrayFieldUIMetaSchema = z.object({
    prefix: z.string().optional(),
    selectionSet: z.string().optional(),
});
