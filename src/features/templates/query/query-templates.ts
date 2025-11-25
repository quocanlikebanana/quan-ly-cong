import { PagedResult, PagingParams } from "@/features/shared/paging.type";
import { TemplateView } from "../types/template.view";
import { TemplateMongoRepository } from "@/models/template-model/mongo-repo";

export default async function queryTemplates(params: PagingParams): Promise<PagedResult<TemplateView>> {
    const repo = new TemplateMongoRepository();
    const result = await repo.findAll(params);
    return result;
}