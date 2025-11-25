import { PagedResult, PagingParams } from "@/features/shared/paging.type";
import { TemplateDataDto, TemplateDataCreateDto, TemplateDataUpdateDto } from "./template.dto";

export interface ITemplateRepository {
    findAll(query: PagingParams): Promise<PagedResult<TemplateDataDto>>;
    findById(id: string): Promise<TemplateDataDto | null>;
    create(data: TemplateDataCreateDto): Promise<{ id: string }>;
    update(id: string, data: TemplateDataUpdateDto): Promise<void>;
    delete(id: string): Promise<void>;
    reset(): Promise<void>;
}