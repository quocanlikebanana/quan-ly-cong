import { parseAsString, parseAsInteger, parseAsStringEnum, createLoader } from 'nuqs/server'
import z from 'zod';

export const VanBanSearchParamsSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    view: z.enum(['grid', 'list']).optional(),
    page: z.number().optional(),
});

export type VanBanSearchParams = z.infer<typeof VanBanSearchParamsSchema>;

const searchParams = {
    search: parseAsString.withDefault(''),
    category: parseAsString.withDefault(''),
    view: parseAsStringEnum(['grid', 'list']).withDefault('grid'),
    page: parseAsInteger.withDefault(1),
};

export const loadVanBanSearchParams = createLoader(searchParams);