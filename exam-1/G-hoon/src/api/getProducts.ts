import type { Category, Product, SortOption } from '@/types/product';
import { api } from './client';

interface GetProductsParams {
  categories?: Category[];
  keyword?: string;
  sort?: SortOption;
  page?: number;
  size?: number;
}

interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export async function getProducts(params: GetProductsParams = {}): Promise<GetProductsResponse> {
  const searchParams: Record<string, string> = {};

  if (params.categories && params.categories.length > 0) {
    searchParams.categories = params.categories.join(',');
  }
  if (params.keyword) {
    searchParams.keyword = params.keyword;
  }
  if (params.sort) {
    searchParams.sort = params.sort;
  }
  if (params.page) {
    searchParams.page = String(params.page);
  }
  if (params.size) {
    searchParams.size = String(params.size);
  }

  return api.get('products', { searchParams }).json<GetProductsResponse>();
}
