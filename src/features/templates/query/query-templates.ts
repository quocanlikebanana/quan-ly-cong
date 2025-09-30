import { PagedResult, PagingParams } from "@/features/shared/paging.type";
import { TemplateItemView } from "./template.view";
import { TemplateMongoRepository } from "@/models/template-model/mongo-repo";

export default async function queryTemplates(params: PagingParams): Promise<PagedResult<TemplateItemView>> {
    const repo = new TemplateMongoRepository();
    const result = await repo.findAll(params);
    return result;
}