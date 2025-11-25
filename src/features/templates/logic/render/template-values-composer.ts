import { TemplateValues } from "../../types/field-schema";
import transformerFactory from "./transformer/transformer-factory";

export default function templateValuesComposer(
    values: TemplateValues,
): unknown {
    const json: Record<string, unknown> = {};

    Object.entries(values).forEach(([key, { type, value, renderMetadata }]) => {
        const transformer = transformerFactory(type, renderMetadata);
        if (transformer) {
            json[key] = transformer.transform(value);
        } else {
            json[key] = value;
        }
    });

    return json;
}