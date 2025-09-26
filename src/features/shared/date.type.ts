export type DateOnly = {
    year: number;
    month: number; // 1-12
    day: number; // 1-31
};

export const DEFAULT_DATEONLY: DateOnly = {
    year: 2025,
    month: 1,
    day: 1,
} as const;


