import type { ProductListResponse, SortOption } from "@/types";
import { client } from "./client";

export async function getAutoComplete({ keyword }: { keyword: string }) {
  return client
    .get("autocomplete", {
      searchParams: {
        keyword,
      },
    })
    .json<{ suggestions: string[] }>();
}

export async function getProducts({
  categories,
  keyword,
  sort,
  page,
  size,
}: {
  categories?: string;
  keyword?: string;
  sort?: SortOption;
  page?: number;
  size?: number;
}) {
  const searchParams: Record<string, string | number> = {};
  const normalizedCategories = categories?.trim();
  const normalizedKeyword = keyword?.trim();

  if (normalizedCategories) {
    searchParams.categories = normalizedCategories;
  }

  if (normalizedKeyword) {
    searchParams.keyword = normalizedKeyword;
  }

  if (sort) {
    searchParams.sort = sort;
  }

  if (typeof page === "number" && Number.isInteger(page) && page > 0) {
    searchParams.page = page;
  }

  if (typeof size === "number" && Number.isInteger(size) && size > 0) {
    searchParams.size = size;
  }

  return client
    .get("products", {
      searchParams,
    })
    .json<ProductListResponse>();
}
