"use server";

import populateTemplateModel from "@/__scripts__/template.populate";

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