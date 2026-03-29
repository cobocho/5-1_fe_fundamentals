import { Star } from 'lucide-react';
import type { Product } from '@/types/product';

const CATEGORY_LABEL: Record<string, string> = {
  shoes: '신발',
  tops: '상의',
  bottoms: '하의',
  accessories: '액세서리',
};

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group cursor-pointer" aria-label={product.name}>
      <figure className="relative aspect-5/6 overflow-hidden bg-gray-100">
        <img
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
        />
      </figure>
      <div className="pt-1.5 md:pt-2.5">
        <span className="text-[11px] font-bold text-gray-900 md:text-xs">
          {CATEGORY_LABEL[product.category] ?? product.category}
        </span>
        <h3 className="mt-0.5 line-clamp-2 text-[11px] leading-tight text-gray-600 md:mt-1 md:text-sm md:leading-snug">
          {product.name}
        </h3>
        <p className="mt-1 md:mt-2">
          <strong className="text-xs font-bold text-gray-900 md:text-sm">
            {product.price.toLocaleString()}원
          </strong>
        </p>
        <p className="mt-1 flex items-center gap-0.5 text-[10px] text-gray-400 md:mt-1.5 md:gap-1 md:text-xs">
          <Star
            className="h-3 w-3 fill-yellow-400 text-yellow-400 md:h-3.5 md:w-3.5"
            aria-hidden="true"
          />
          <span>{product.rating.toFixed(1)}</span>
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
