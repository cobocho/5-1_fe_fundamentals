import { http } from '@/shared/api/http';
import type { Product, ProductsResponse } from '@/types';

export async function fetchProducts(): Promise<Product[]> {
  const data = await http.get<ProductsResponse>('/api/products?size=100');
  return data.products;
}
