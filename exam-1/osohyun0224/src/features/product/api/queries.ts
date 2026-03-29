import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/api/queryKeys';
import { fetchProducts } from '@/features/product/api/fetchProducts';

export function useProducts() {
  return useSuspenseQuery({
    queryKey: queryKeys.products,
    queryFn: fetchProducts,
  });
}
