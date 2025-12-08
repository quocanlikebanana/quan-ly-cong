import z from "../../../../node_modules/zod/v4/classic/external.cjs";

export const FIELD_TYPES = {
    text: "text",
    date: "date",
    array: "array",
} as const;

export const TemplateFieldEnumDtoSchema = z.enum([FIELD_TYPES.text, FIELD_TYPES.date, FIELD_TYPES.array]);

