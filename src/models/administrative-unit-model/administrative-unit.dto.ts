import { PagingParams } from "@/features/shared/paging.type";

export type AdministrativeUnitDto = {
    id: string;
    name: string;
    code: string;
    parentUnitId?: string;
    createdAt: string;
    updatedAt: string;
} & ({
    level: 'commune';
    type: 'commune' | 'ward' | 'special-zone';
} | {
    level: 'province';
    type: 'province' | 'city';
});

export type AdministrativeUnitCreateDto = Omit<AdministrativeUnitDto, 'createdAt' | 'updatedAt'>;

export type AdministrativeUnitUpdateDto = Partial<Omit<AdministrativeUnitDto, 'id' | 'createdAt' | 'updatedAt'>>;

export type AdministrativeUnitQueryDto = {
    level?: 'commune' | 'province';
    type?: 'commune' | 'ward' | 'special-zone' | 'province' | 'city';
    parentUnitId?: string;
} & PagingParams;