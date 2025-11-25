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
