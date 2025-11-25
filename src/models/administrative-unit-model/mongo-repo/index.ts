import connectMongo from "@/infra/database/mongoose";
import { AdministrativeUnitDto, AdministrativeUnitCreateDto, AdministrativeUnitQueryDto, AdministrativeUnitUpdateDto } from "../administrative-unit.dto";
import { IAdministrativeUnitRepository } from "../administrative-unit.repo";
import { PagedResult } from "@/features/shared/paging.type";
import AdministrativeUnitModel from "./administrative.model";

export class AdministrativeUnitMongoRepository implements IAdministrativeUnitRepository {
    async findAll(query: AdministrativeUnitQueryDto): Promise<PagedResult<AdministrativeUnitDto>> {
        await connectMongo();
        const { level, type, parentUnitId, perPage, page } = query;

        const searchQuery: Record<string, unknown> = {};

        if (level) {
            searchQuery.level = level;
        }

        if (type) {
            searchQuery.type = type;
        }

        if (parentUnitId) {
            searchQuery.parentUnitId = parentUnitId;
        }

        const administrativeUnits = await AdministrativeUnitModel
            .find(searchQuery)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .lean<AdministrativeUnitDto[]>()
            ;
        const total = await AdministrativeUnitModel.countDocuments(searchQuery);
        return {
            data: administrativeUnits,
            total,
            totalPages: Math.ceil(total / perPage),
            currentPage: page,
            perPage,
        };
    }

    async findById(id: string): Promise<AdministrativeUnitDto | null> {
        await connectMongo();
        const administrativeUnit = await AdministrativeUnitModel.findById(id).lean<AdministrativeUnitDto>();
        return administrativeUnit;
    }

    async create(data: AdministrativeUnitCreateDto): Promise<{ id: string }> {
        await connectMongo();
        const newAdministrativeUnit = await AdministrativeUnitModel.create({
            ...data,
        });
        return { id: newAdministrativeUnit.id };
    }

    async update(id: string, data: AdministrativeUnitUpdateDto): Promise<void> {
        await connectMongo();
        await AdministrativeUnitModel.findByIdAndUpdate(id, data);
    }

    async delete(id: string): Promise<void> {
        await connectMongo();
        await AdministrativeUnitModel.findByIdAndDelete(id);
    }

    async reset(): Promise<void> {
        await connectMongo();
        await AdministrativeUnitModel.deleteMany({});
    }
}
