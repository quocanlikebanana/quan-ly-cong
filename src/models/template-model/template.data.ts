import { PagingParams } from "@/features/shared/paging.type";

export type TemplateData = {
    id: string;
    name: string;
    description?: string;
    category?: string;
    tags?: string[];
    fields: TemplateFieldData[];
    createdAt: string;
    updatedAt: string;
}

export type TemplateFieldData = {
    type: string;
    key: string;
    label: string;
    description?: string;
    order?: number;
    uiMetadata?: Record<string, unknown>;
    renderMetadata?: Record<string, unknown>;
}

export type TemplateDataCreate = Omit<TemplateData, 'createdAt' | 'updatedAt'>;

export type TemplateDataUpdate = Partial<Omit<TemplateData, 'id' | 'createdAt' | 'updatedAt'>>;

export type TemplateDataQuery = PagingParams;
