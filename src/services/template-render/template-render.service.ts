import { TemplateFieldMapDtoType } from "@/features/templates/types/template.dto";
import { DocxRenderInfra } from "@/infra/docx-render/docx-render.infra";
import { RenderTransformerFactory } from "./common/render-transformer.factory";

export class TemplateRenderService {
    static render(values: TemplateFieldMapDtoType, docFileBinary: string): Buffer<ArrayBufferLike> {
        const json: Record<string, unknown> = {};
        Object.entries(values).forEach(([key, { type, value, renderMetadata }]) => {
            const transformer = RenderTransformerFactory.create(type, renderMetadata);
            if (transformer) {
                json[key] = transformer.transform(value);
            } else {
                json[key] = value;
            }
        });
        const buffer = DocxRenderInfra.render(docFileBinary, json);
        return buffer;
    }
}