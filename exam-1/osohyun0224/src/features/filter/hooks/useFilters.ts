import { useCallback, useMemo, useState } from 'react';
import type {
  Category,
  Product,
  ProductFilters,
  SortOption,
} from '@/types';

const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  keyword: '',
  sort: 'newest',
};

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export function useFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category));
    }

    if (filters.keyword.trim()) {
      const lower = filters.keyword.toLowerCase();
      result = result.filter((product) => product.name.toLowerCase().includes(lower));
    }

    result = sortProducts(result, filters.sort);
    return result;
  }, [products, filters]);

  const toggleCategory = useCallback((category: Category) => {
    setFilters((prev) => {
      const has = prev.categories.includes(category);
      return {
        ...prev,
        categories: has
          ? prev.categories.filter((cat) => cat !== category)
          : [...prev.categories, category],
      };
    });
  }, []);

  const setKeyword = useCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword }));
  }, []);

  const setSort = useCallback((sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.keyword.trim() !== '' ||
    filters.sort !== 'newest';

  return {
    filters,
    filteredProducts,
    toggleCategory,
    setKeyword,
    setSort,
    resetFilters,
    hasActiveFilters,
  };
}
