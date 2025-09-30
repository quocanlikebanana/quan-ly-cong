"use server";

import populateTemplateModel from "@/models/template-model/template.populate";

// bun run --conditions=react-server ./src/__scripts__/populate.ts

const populateData = async () => {
    await populateTemplateModel();
}

populateData().then(() => {
    console.log('Data population completed.');
    process.exit(0);
}).catch((error) => {
    console.error('Error during data population:', error);
    process.exit(1);
});