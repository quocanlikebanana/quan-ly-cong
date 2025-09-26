import z from "zod";

export const FIELD_TYPES = {
    text: "text",
    date: "date",
    array: "array",
} as const;

export const TemplateCommonFieldSchema = z.object({
    type: z.enum([FIELD_TYPES.text, FIELD_TYPES.date, FIELD_TYPES.array]),
    key: z.string(),
    label: z.string().min(1, "Label is required"),
    description: z.string().optional(),
    order: z.number().min(0).optional(),
    /**
     * Contains additional metadata for a specific field, such as validation rules, UI hints, etc.
     */
    metadata: z.record(z.string(), z.unknown()).optional(),
});

export const TextFieldSchema = TemplateCommonFieldSchema.extend({
    selectionSet: z.string().optional(),
});

export const DateFieldSchema = TemplateCommonFieldSchema.extend({
    formatType: z.enum([
        "dd/mm/yyyy",
        "ngay__,thang__,nam____"
    ]).default("ngay__,thang__,nam____"),
});

export const ArrayFieldSchema = TemplateCommonFieldSchema.extend({
    prefix: z.string().optional(),
    selectionSet: z.string().optional(),
});

export const TemplateValuesSchema = z.record(z.string(), z.object({
    type: z.enum([FIELD_TYPES.text, FIELD_TYPES.date, FIELD_TYPES.array]),
    value: z.unknown().optional(),
}));

export type TemplateValues = z.infer<typeof TemplateValuesSchema>;
export type TemplateCommonField = z.infer<typeof TemplateCommonFieldSchema>;

