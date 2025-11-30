import { TemplateDetailView } from "../types/template.view";
import { TemplateMongoRepository } from "@/models/template-model/mongo-repo";

export default async function queryTemplateById(id: string): Promise<TemplateDetailView | null> {
    const repo = new TemplateMongoRepository();
    // Sleep for 1 minute to simulate latency
    await new Promise((resolve) => setTimeout(resolve, 1000 * 60));

    return await repo.findById(id);
}
