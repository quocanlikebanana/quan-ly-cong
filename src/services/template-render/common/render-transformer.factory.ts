import { FIELD_TYPES } from "@/features/templates/types/template.common";
import { IRenderTransformer } from "./render-transformer.i";
import { RenderArrayFieldMetaSchema, RenderDateFieldMetaSchema, RenderTextFieldMetaSchema } from "./render-fields.schema";
import { TextTransformer } from "../transformer/text-transformer";
import { DateTransformer } from "../transformer/date-transformer";
import { ArrayTransformer } from "../transformer/array-transformer";

export class RenderTransformerFactory {
    static create(type: string, metadata: unknown): IRenderTransformer | null {
        try {
            switch (type) {
                case FIELD_TYPES.text:
                    return new TextTransformer(RenderTextFieldMetaSchema.parse(metadata));
                case FIELD_TYPES.date:
                    return new DateTransformer(RenderDateFieldMetaSchema.parse(metadata));
                case FIELD_TYPES.array:
                    return new ArrayTransformer(RenderArrayFieldMetaSchema.parse(metadata));
                default:
                    return null;
            }
        } catch {
            return null;
        }
    }
}

