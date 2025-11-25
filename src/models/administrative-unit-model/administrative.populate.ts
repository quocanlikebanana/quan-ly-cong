import { faker } from '@faker-js/faker';
import { AdministrativeUnitMongoRepository } from "./mongo-repo";
import { AdministrativeUnitCreateDto } from "./administrative-unit.dto";

export default async function populateAdministrativeUnitModel() {
    const repo = new AdministrativeUnitMongoRepository();

    await repo.reset();

    // Create provinces/cities first (no parent)
    const provinces: AdministrativeUnitCreateDto[] = Array.from({ length: 5 }).map((): AdministrativeUnitCreateDto => ({
        id: `${faker.string.uuid()}${Date.now()}`,
        name: faker.location.state(),
        code: faker.string.alphanumeric(6).toUpperCase(),
        level: 'province',
        type: faker.helpers.arrayElement(['province', 'city']),
    }));

    const createdProvinces = [];
    for (const province of provinces) {
        const result = await repo.create(province);
        createdProvinces.push({ ...province, id: result.id });
    }

    // Create communes/wards/special-zones under provinces
    const communes: AdministrativeUnitCreateDto[] = [];
    for (const province of createdProvinces) {
        const communeCount = faker.number.int({ min: 3, max: 8 });
        for (let i = 0; i < communeCount; i++) {
            communes.push({
                id: `${faker.string.uuid()}${Date.now()}-${i}`,
                name: faker.location.city(),
                code: faker.string.alphanumeric(8).toUpperCase(),
                level: 'commune',
                type: faker.helpers.arrayElement(['commune', 'ward', 'special-zone']),
                parentUnitId: province.id,
            });
        }
    }

    for (const commune of communes) {
        await repo.create(commune);
    }

    console.log(`Created ${provinces.length} provinces and ${communes.length} communes`);
}
