import { ArrayFieldRenderMetaSchema, DateFieldRenderMetaSchema, TextFieldRenderMetaSchema } from "../../../types/field-render-meta.schema";
import { FIELD_TYPES } from "../../../types/field-schema";
import { ArrayTransformer } from "./array-transformer";
import { DateTransformer } from "./date-transformer";
import { TextTransformer } from "./text-transformer";
import { ITransformer, TransformerFactory } from "./transformer.i";

const transformerFactory: TransformerFactory = (type: string, metadata: unknown): ITransformer | null => {
    try {
        switch (type) {
            case FIELD_TYPES.text:
                return new TextTransformer(TextFieldRenderMetaSchema.parse(metadata));
            case FIELD_TYPES.date:
                return new DateTransformer(DateFieldRenderMetaSchema.parse(metadata));
            case FIELD_TYPES.array:
                return new ArrayTransformer(ArrayFieldRenderMetaSchema.parse(metadata));
            default:
                return null;
        }
    } catch {
        return null;
    }
}

export default transformerFactory;