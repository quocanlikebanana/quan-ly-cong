import { PagingParams } from "@/features/shared/paging.type";
import { ObjectId } from "mongodb";

export type TemplateDataDto = {
    id: string;
    name: string;
    description?: string;
    category?: string;
    tags?: string[];
    fields: TemplateFieldDataDto[];
    storage: TemplateStorageDto;
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

export type TemplateStorageDto = {
    storageType: 'local' | 's3';
    path: string;
}

export type TemplateDataCreateDto = Omit<TemplateDataDto, 'id' | 'createdAt' | 'updatedAt'>;

export type TemplateDataUpdateDto = Partial<Omit<TemplateDataDto, 'id' | 'createdAt' | 'updatedAt'>>;

export type TemplateDataQueryDto = PagingParams;

export class TemplateDataDtoParser {
    static fromLean(lean: TemplateDataDto & { _id: ObjectId }): TemplateDataDto {
        return {
            id: lean._id.toString(),
            name: lean.name,
            description: lean.description,
            category: lean.category,
            tags: lean.tags,
            storage: TemplateStorageDtoParser.fromLean(lean.storage),
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

class TemplateStorageDtoParser {
    static fromLean(lean: TemplateStorageDto): TemplateStorageDto {
        return {
            storageType: lean.storageType,
            path: lean.path,
        };
    }
}