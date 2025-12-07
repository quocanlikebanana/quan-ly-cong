/**
 * bun run --conditions=react-server src/models/template-model/mongo-repo/__scripts__/template-mongo-reset.script.ts
 */

import { TemplateMongoRepository } from "..";

async function resetTemplates() {
    const repo = new TemplateMongoRepository();
    await repo.reset();
    console.log("Template collection has been reset.");
    process.exit(0);
}

resetTemplates().catch(err => {
    console.error("Error resetting templates:", err);
    process.exit(1);
});
