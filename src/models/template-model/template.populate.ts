import { faker } from '@faker-js/faker';
import { TemplateMongoRepository } from "./mongo-repo";
import { TemplateDataCreateDto, TemplateFieldDataDto } from "./template.dto";

export default async function populateTemplateModel() {
    const repo = new TemplateMongoRepository();

    await repo.reset();

    const mockData: TemplateDataCreateDto[] = Array.from({ length: 10 }).map((): TemplateDataCreateDto => ({
        id: `${faker.string.uuid()}${Date.now()}`,
        name: faker.lorem.words(3),
        fields: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map((_, fieldIndex): TemplateFieldDataDto => ({
            key: `key-${Date.now()}-${fieldIndex + 1}`,
            label: faker.lorem.words(2),
            type: faker.helpers.arrayElement(['text', 'number', 'boolean']),
            description: faker.lorem.sentence(),
            order: fieldIndex + 1,
            uiMetadata: {},
            renderMetadata: {},
        })),
        description: faker.lorem.sentence(),
        category: faker.lorem.word(),
        tags: faker.lorem.words(2).split(' '),
    }));

    for (const data of mockData) {
        await repo.create(data);
    }
}

