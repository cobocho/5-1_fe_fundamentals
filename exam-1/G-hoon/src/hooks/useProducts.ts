import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/api';
import { useProductFilters } from './useProductFilters';

export function useProducts() {
  const { categories, keyword, sort } = useProductFilters();

  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['products', { categories, keyword, sort }],
    queryFn: ({ pageParam }) =>
      getProducts({
        categories,
        keyword: keyword || undefined,
        sort,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });

  return {
    products: data.pages.flatMap((page) => page.products),
    error: error
      ? '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      : null,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
