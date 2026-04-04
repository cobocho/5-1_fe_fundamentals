import {
  CATEGORY,
  type Category,
  type CategoryLabel,
  SORT,
  type SortLabel,
  type SortOption,
} from "@/types";

export { CATEGORY, DEFAULT_SORT, SORT } from "@/types";

export const CATEGORY_OPTIONS = (
  Object.entries(CATEGORY) as Array<[Category, CategoryLabel]>
).map(([value, label]) => ({
  value,
  label,
}));

export const SORT_OPTIONS = (
  Object.entries(SORT) as Array<[SortOption, SortLabel]>
).map(([value, label]) => ({
  value,
  label,
}));
