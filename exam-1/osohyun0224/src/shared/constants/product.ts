import type { Category, SortOption } from '@/types';

export const ALL_CATEGORIES: Category[] = [
  'shoes',
  'tops',
  'bottoms',
  'accessories',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  shoes: '신발',
  tops: '상의',
  bottoms: '하의',
  accessories: '액세서리',
};

export const SORT_LABELS: Record<SortOption, string> = {
  newest: '최신순',
  price_asc: '가격 낮은순',
  price_desc: '가격 높은순',
  rating: '평점순',
};
