import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import type {
	ProductsRequest,
	ProductsResponse,
} from '../../api/products.types';
import { ProductsInfinityList } from './products-infinity-list';

vi.mock('../../api/products.service', () => ({
	productsService: {
		getProducts: vi.fn(),
	},
}));

import { productsService } from '../../api/products.service';

const mockGetProducts = vi.mocked(productsService.getProducts);

const mockResponse = (
	page: number,
	totalPages: number,
): ProductsResponse => ({
	products: [
		{
			id: page,
			name: `상품 ${page}`,
			price: 10000 * page,
			category: 'shoes',
			imageUrl: 'https://picsum.photos/200',
			createdAt: '2026-01-01T00:00:00Z',
			rating: 4.5,
		},
	],
	total: totalPages,
	page,
	size: 1,
	totalPages,
});

const defaultFilters: ProductsRequest = {
	categories: null,
	keyword: null,
	sort: null,
	page: 1,
	size: 20,
};

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe('ProductsInfinityList', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('로딩 중일 때 로딩 표시가 보인다', () => {
		mockGetProducts.mockReturnValue(new Promise(() => {}));

		render(<ProductsInfinityList filters={defaultFilters} />, {
			wrapper: createWrapper(),
		});

		expect(screen.getByText('로딩 중...')).toBeInTheDocument();
	});

	it('상품 데이터를 불러와 카드로 렌더링한다', async () => {
		mockGetProducts.mockResolvedValue(mockResponse(1, 1));

		render(<ProductsInfinityList filters={defaultFilters} />, {
			wrapper: createWrapper(),
		});

		await waitFor(() => {
			expect(screen.getByText('상품 1')).toBeInTheDocument();
		});
	});

	it('API 에러 시 에러 메시지가 표시된다', async () => {
		mockGetProducts.mockRejectedValue(new Error('server error'));

		render(<ProductsInfinityList filters={defaultFilters} />, {
			wrapper: createWrapper(),
		});

		await waitFor(
			() => {
				expect(screen.getByText('에러가 발생했습니다.')).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);
	});

	it('결과가 없으면 빈 상태 안내가 표시된다', async () => {
		mockGetProducts.mockResolvedValue({
			products: [],
			total: 0,
			page: 1,
			size: 20,
			totalPages: 0,
		});

		render(<ProductsInfinityList filters={defaultFilters} />, {
			wrapper: createWrapper(),
		});

		await waitFor(() => {
			expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
		});
	});
});
