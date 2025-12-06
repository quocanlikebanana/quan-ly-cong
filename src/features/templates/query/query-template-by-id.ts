import { TemplateDetailView } from "../types/template.view";
import { TemplateMongoRepository } from "@/models/template-model/mongo-repo";

export default async function queryTemplateById(id: string): Promise<TemplateDetailView | null> {
    const repo = new TemplateMongoRepository();
    const res = await repo.findById(id);
    return res;
}
