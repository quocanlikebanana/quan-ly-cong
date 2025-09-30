import z from "zod";

export const DateOnlySchema = z.object({
    year: z.number().int().min(1900).max(2100),
    month: z.number().int().min(1).max(12), // 1-12
    day: z.number().int().min(1).max(31), // 1-31
});

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


