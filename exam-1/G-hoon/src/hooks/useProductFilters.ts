import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useCallback } from 'react';
import type { Category, SortOption } from '@/types/product';

const CATEGORIES = ['shoes', 'tops', 'bottoms', 'accessories'] as const;
const SORT_OPTIONS = ['price_asc', 'price_desc', 'newest', 'rating'] as const;

export function useProductFilters() {
  const [keyword, setKeyword] = useQueryState('keyword', {
    defaultValue: '',
    shallow: false,
  });

  const [categories, setCategories] = useQueryState(
    'categories',
    parseAsArrayOf(parseAsStringLiteral(CATEGORIES))
      .withDefault([] as Category[])
      .withOptions({ shallow: false }),
  );

  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(SORT_OPTIONS)
      .withDefault('newest' as SortOption)
      .withOptions({ shallow: false }),
  );

  const resetAll = useCallback(() => {
    setKeyword(null);
    setCategories(null);
    setSort(null);
  }, [setKeyword, setCategories, setSort]);

  return {
    keyword,
    categories,
    sort,
    setKeyword,
    setCategories,
    setSort,
    resetAll,
  };
}
