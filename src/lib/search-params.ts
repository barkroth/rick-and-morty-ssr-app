import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  status: parseAsString.withDefault(''),
  gender: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
});

export type SearchParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;
