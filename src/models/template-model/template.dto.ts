import { PagingParams } from "@/features/shared/paging.type";

export type TemplateDataDto = {
    id: string;
    name: string;
    description?: string;
    category?: string;
    tags?: string[];
    fields: TemplateFieldDataDto[];
    createdAt: string;
    updatedAt: string;
}

export type TemplateFieldDataDto = {
    type: string;
    key: string;
    label: string;
    description?: string;
    order?: number;
    uiMetadata?: Record<string, unknown>;
    renderMetadata?: Record<string, unknown>;
}

export type TemplateDataCreateDto = Omit<TemplateDataDto, 'createdAt' | 'updatedAt'>;

export type TemplateDataUpdateDto = Partial<Omit<TemplateDataDto, 'id' | 'createdAt' | 'updatedAt'>>;

export type TemplateDataQueryDto = PagingParams;

export class TemplateDataDtoParser {
    static fromLean(lean: TemplateDataDto): TemplateDataDto {
        return {
            id: lean.id.toString(),
            name: lean.name,
            description: lean.description,
            category: lean.category,
            tags: lean.tags,
            fields: lean.fields.map(TemplateFieldDataDtoParser.fromLean),
            createdAt: lean.createdAt,
            updatedAt: lean.updatedAt,
        };
    }
}

class TemplateFieldDataDtoParser {
    static fromLean(lean: TemplateFieldDataDto): TemplateFieldDataDto {
        return {
            type: lean.type,
            key: lean.key,
            label: lean.label,
            description: lean.description,
            order: lean.order,
            uiMetadata: lean.uiMetadata,
            renderMetadata: lean.renderMetadata,
        };
    }
}