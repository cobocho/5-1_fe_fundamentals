import { useInfiniteQuery, type QueryStatus } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { productsQuery } from '../../api/products.query';
import type { Product, ProductsRequest } from '../../api/products.types';
import { ProductCard } from '../product-card/product-card';

interface ProductsInfinityListProps {
	filters: ProductsRequest;
}

export const ProductsInfinityList = ({
	filters,
}: ProductsInfinityListProps) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery(productsQuery.getInfiniteProductsQueryOptions(filters));

	const handleIntersect = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage && status !== 'error')
			fetchNextPage();
	}, [hasNextPage, isFetchingNextPage, status, fetchNextPage]);

	const observerRef = useIntersectionObserver(handleIntersect);

	const products = data?.pages.flatMap((page) => page.products) ?? [];

	const productListStatus = getProductListStatus(status, products);

	return (
		<div>
			<div className="grid grid-cols-2 gap-4">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>
			<div
				ref={observerRef}
				className="h-10"
			/>
			{productListStatus === 'empty' && <p>검색 결과가 없습니다.</p>}
			{productListStatus === 'pending' && <p>로딩 중...</p>}
			{productListStatus === 'error' && <p>에러가 발생했습니다.</p>}
			{isFetchingNextPage && <p>더 불러오는 중...</p>}
		</div>
	);
};

const getProductListStatus = (status: QueryStatus, products: Product[]) => {
	switch (status) {
		case 'pending':
			return 'pending';
		case 'error':
			return 'error';
		case 'success':
			return products.length === 0 ? 'empty' : 'success';
	}
};
