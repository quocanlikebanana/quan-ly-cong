import z from "zod";
import { FIELD_TYPES, TemplateFieldEnumDtoSchema } from "./template.common";

export const TemplateFieldDtoSchema = z.object({
    type: TemplateFieldEnumDtoSchema,
    key: z.string(),
    label: z.string().min(1, "Label is required"),
    description: z.string().optional(),
    order: z.number().min(0).optional(),
    /**
     * Contains additional metadata for a specific field, such as validation rules, UI hints, etc. on both UI and rendering.
     */
    uiMetadata: z.record(z.string(), z.unknown()).optional(),
    renderMetadata: z.record(z.string(), z.unknown()).optional(),
});
export type TemplateFieldDtoType = z.infer<typeof TemplateFieldDtoSchema>;


export const TemplateFieldMapDtoSchema = z.record(z.string(), z.object({
    type: z.enum([FIELD_TYPES.text, FIELD_TYPES.date, FIELD_TYPES.array]),
    value: z.unknown().optional(),
    renderMetadata: z.record(z.string(), z.unknown()).optional(),
}));
export type TemplateFieldMapDtoType = z.infer<typeof TemplateFieldMapDtoSchema>;

