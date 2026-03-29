import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">🔍</p>
        <p className="empty-title">검색 결과가 없습니다</p>
        <p className="empty-description">
          다른 검색어나 필터 조건을 사용해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
