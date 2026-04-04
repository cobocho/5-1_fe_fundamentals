export const CATEGORY = {
  shoes: '신발',
  tops: '상의',
  bottoms: '하의',
  accessories: '액세서리',
} as const;

export type Category = keyof typeof CATEGORY;
export type CategoryLabel = (typeof CATEGORY)[Category];

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  createdAt: string; // ISO 8601
  rating: number; // 1.0 ~ 5.0
}

export const SORT = {
  newest: '최신순',
  rating: '평점순',
  price_asc: '가격 낮은순',
  price_desc: '가격 높은순',
} as const;

export type SortOption = keyof typeof SORT;
export type SortLabel = (typeof SORT)[SortOption];
export const DEFAULT_SORT = 'newest' satisfies SortOption;

export function isCategory(
  value: string | null | undefined,
): value is Category {
  if (!value) {
    return false;
  }

  return Object.hasOwn(CATEGORY, value);
}

export function isSortOption(
  value: string | null | undefined,
): value is SortOption {
  if (!value) {
    return false;
  }

  return Object.hasOwn(SORT, value);
}

export interface ProductFilters {
  categories: Category[];
  keyword?: string;
  sort: SortOption;
}
