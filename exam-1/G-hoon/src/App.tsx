import { Suspense } from 'react';
import {
  CategoryFilter,
  ProductCount,
  ProductErrorBoundary,
  ProductList,
  ProductListSkeleton,
  ResetFiltersButton,
  ScrollToTopButton,
  SearchBar,
  SortSelect,
} from '@/components';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 - 모바일: 검색바 포함 / 데스크톱: 로고만 */}
      <header className="sticky top-0 z-30 bg-white md:border-b md:border-gray-200">
        <div className="mx-auto max-w-full px-4 md:px-6">
          {/* 모바일 헤더 */}
          <div className="flex h-12 items-center gap-3 md:hidden">
            <SearchBar />
          </div>
          {/* 데스크톱 헤더 */}
          <div className="hidden h-14 items-center md:flex">
            <h1 className="text-lg font-bold tracking-tight text-black">
              SIPE-SHOP
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-full px-4 md:px-6">
        {/* 데스크톱 검색 영역 */}
        <search className="hidden mx-auto max-w-xl py-6 md:block">
          <SearchBar />
        </search>

        {/* 필터 영역 */}
        <nav
          className="flex gap-2 border-b border-gray-200 py-3 md:flex-row flex-col items-start md:items-center"
          aria-label="상품 필터"
        >
          <CategoryFilter>
            <CategoryFilter.AllChip>전체</CategoryFilter.AllChip>
            <CategoryFilter.Chip value="shoes">신발</CategoryFilter.Chip>
            <CategoryFilter.Chip value="tops">상의</CategoryFilter.Chip>
            <CategoryFilter.Chip value="bottoms">하의</CategoryFilter.Chip>
            <CategoryFilter.Chip value="accessories">
              액세서리
            </CategoryFilter.Chip>
          </CategoryFilter>
          <ResetFiltersButton />
        </nav>

        {/* 상품 수 + 정렬 */}
        <div className="flex items-center justify-between py-3">
          <ProductCount />
          <SortSelect />
        </div>

        {/* 상품 목록 */}
        <section aria-label="상품 목록" className="pb-6">
          <ProductErrorBoundary>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList />
            </Suspense>
          </ProductErrorBoundary>
        </section>
      </main>

      <ScrollToTopButton />
    </div>
  );
}

export default App;
