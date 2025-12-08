import z from "zod";
import { TemplateFieldMapDtoSchema } from "../../types/template.dto";

export const FillTemplateActionSchema = z.object({
    templateId: z.string().min(1, "Template ID is required"),
    fieldMap: TemplateFieldMapDtoSchema,
});
export type FillTemplateActionType = z.infer<typeof FillTemplateActionSchema>;
