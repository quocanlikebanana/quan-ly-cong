import { PagedResult } from "@/features/shared/paging.type";
import { AdministrativeUnitQueryDto, AdministrativeUnitDto, AdministrativeUnitCreateDto, AdministrativeUnitUpdateDto } from "./administrative-unit.dto";

export interface IAdministrativeUnitRepository {
    findAll(query: AdministrativeUnitQueryDto): Promise<PagedResult<AdministrativeUnitDto>>;
    findById(id: string): Promise<AdministrativeUnitDto | null>;
    create(data: AdministrativeUnitCreateDto): Promise<{ id: string }>;
    update(id: string, data: AdministrativeUnitUpdateDto): Promise<void>;
    delete(id: string): Promise<void>;
    reset(): Promise<void>;
}