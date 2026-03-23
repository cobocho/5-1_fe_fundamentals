import { delay, HttpResponse, http } from 'msw';
import type { Category, SortOption } from '../types/product';
import { products } from './data';

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    // 네트워크 지연 시뮬레이션 (300~800ms 랜덤)
    await delay(Math.random() * 500 + 300);

    const url = new URL(request.url);

    // 쿼리 파라미터 파싱
    const categoriesParam = url.searchParams.get('categories'); // 쉼표로 구분: "shoes,tops"
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const keyword = url.searchParams.get('keyword');
    const sort = url.searchParams.get('sort') as SortOption | null;

    let filtered = [...products];

    // 카테고리 필터
    if (categoriesParam) {
      const categories = categoriesParam.split(',') as Category[];
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    // 가격 범위 필터
    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    // 키워드 검색
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(lowerKeyword),
      );
    }

    // 정렬
    switch (sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return HttpResponse.json({
      products: filtered,
      total: filtered.length,
    });
  }),
];
