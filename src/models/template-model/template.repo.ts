import { PagedResult, PagingParams } from "@/features/shared/paging.type";
import { TemplateData, TemplateDataCreate, TemplateDataUpdate } from "./template.data";

export interface ITemplateRepository {
    findAll(query: PagingParams): Promise<PagedResult<TemplateData>>;
    findById(id: string): Promise<TemplateData | null>;
    create(data: TemplateDataCreate): Promise<{ id: string }>;
    update(id: string, data: TemplateDataUpdate): Promise<void>;
    delete(id: string): Promise<void>;
    reset(): Promise<void>;
}