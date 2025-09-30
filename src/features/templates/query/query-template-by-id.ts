import { TemplateDetailView } from "./template.view";
import { TemplateMongoRepository } from "@/models/template-model/mongo-repo";

export default async function queryTemplateById(id: string): Promise<TemplateDetailView | null> {
    const repo = new TemplateMongoRepository();
    return await repo.findById(id);
}
