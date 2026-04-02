import { useCallback, useTransition } from 'react';
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';
import { useFilterStore } from '@/store/filter-store';

const parsers = {
  status: parseAsString.withDefault(''),
  gender: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
};

export function useFilters() {
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useQueryStates(parsers, {
    shallow: false,
    startTransition,
  });

  const setStatus = useCallback(
    (status: string) => {
      const update = { status: status || null, page: 1 };
      setParams(update);
      useFilterStore.getState().setFilters({ status: status || '', page: 1 });
    },
    [setParams]
  );

  const setGender = useCallback(
    (gender: string) => {
      const update = { gender: gender || null, page: 1 };
      setParams(update);
      useFilterStore.getState().setFilters({ gender: gender || '', page: 1 });
    },
    [setParams]
  );

  const setPage = useCallback(
    (page: number) => {
      setParams({ page });
      useFilterStore.getState().setFilters({ page });
    },
    [setParams]
  );

  const resetFilters = useCallback(() => {
    setParams({ status: null, gender: null, page: 1 });
    useFilterStore.getState().resetFilters();
  }, [setParams]);

  return {
    status: params.status,
    gender: params.gender,
    page: params.page,
    isPending,
    setStatus,
    setGender,
    setPage,
    resetFilters,
  };
}
