import type { Product } from "./product";

export * from "./product";

export interface BaseResponse {
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface ProductListResponse extends BaseResponse {
  products: Product[];
}
