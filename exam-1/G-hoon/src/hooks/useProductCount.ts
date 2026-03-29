import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api';
import { useProductFilters } from './useProductFilters';

export function useProductCount() {
  const { categories, keyword, sort } = useProductFilters();

  const { data } = useQuery({
    queryKey: ['productCount', { categories, keyword, sort }],
    queryFn: () =>
      getProducts({
        categories,
        keyword: keyword || undefined,
        sort,
        size: 1,
      }),
    select: (data) => data.total,
    placeholderData: keepPreviousData,
  });

  return data ?? 0;
}
