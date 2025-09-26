export type PagedResult<T> = {
    data: T[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
};

export type PagingParams = {
    page: number;
    perPage: number;
    search?: string;
};

export const DEFAULT_PAGING: PagingParams = {
    page: 1,
    perPage: 10,
};

