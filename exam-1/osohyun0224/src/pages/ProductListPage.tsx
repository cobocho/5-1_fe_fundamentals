import { ActiveFilters } from '@/features/filter/components/ActiveFilters';
import { CategoryFilter } from '@/features/filter/components/CategoryFilter';
import { SortSelect } from '@/features/filter/components/SortSelect';
import { useFilters } from '@/features/filter/hooks/useFilters';
import { ProductGrid } from '@/features/product/components/ProductGrid';
import { useProducts } from '@/features/product/api/queries';
import { SearchBar } from '@/features/search/components/SearchBar';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';
import { usePagination } from '@/shared/hooks/usePagination';
import '@/App.css';

export function ProductListPage() {
  const { data: products } = useProducts();

  const {
    filters,
    filteredProducts,
    toggleCategory,
    setKeyword,
    setSort,
    resetFilters,
    hasActiveFilters,
  } = useFilters(products);

  const { visibleItems, totalCount, hasMore, loadMore } =
    usePagination(filteredProducts);

  const sentinelRef = useIntersectionObserver(loadMore, hasMore);

  return (
    <div className="app">
      <header className="app-header">
        <h1>상품 목록</h1>
        <SearchBar keyword={filters.keyword} onKeywordChange={setKeyword} />
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <CategoryFilter
            selected={filters.categories}
            onToggle={toggleCategory}
          />
          <SortSelect value={filters.sort} onChange={setSort} />
        </aside>

        <main className="main-content">
          <ActiveFilters
            filters={filters}
            totalCount={totalCount}
            hasActiveFilters={hasActiveFilters}
            onRemoveCategory={toggleCategory}
            onClearKeyword={() => setKeyword('')}
            onResetAll={resetFilters}
          />
          <ProductGrid products={visibleItems} />
          {hasMore && (
            <div ref={sentinelRef} className="scroll-sentinel">
              <LoadingSpinner />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
