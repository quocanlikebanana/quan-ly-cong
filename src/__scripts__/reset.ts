"use server";

// bun run --conditions=react-server ./src/__scripts__/reset.ts

const populateData = async () => {
    const repo = new (await import("@/models/template-model/mongo-repo")).TemplateMongoRepository();
    await repo.reset();
}

populateData().then(() => {
    console.log('Successfully executed.');
    process.exit(0);
}).catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});