import {
	CategoryFilter,
	ProductList,
	SearchBar,
	SortSelect,
} from "@/components";
import type { Category, Product, SortOption } from "@/types/product";

function App() {
	// TODO: 상태 관리 (useState, URL params 등)
	const selectedCategories: Category[] = [];
	const sort: SortOption = "newest";
	const products: Product[] = [];
	const isLoading = false;
	const error: string | null = null;
	const totalCount = 10;

	// TODO: 핸들러 함수
	const handleSearch = (_keyword: string) => {};
	const handleCategoryChange = (_categories: Category[]) => {};
	const handleSortChange = (_sort: SortOption) => {};
	const handleRetry = () => {};
	const handleReset = () => {};

	return (
		<div className="min-h-screen bg-white">
			{/* 헤더 - 모바일: 검색바 포함 / 데스크톱: 로고만 */}
			<header className="sticky top-0 z-30 bg-white md:border-b md:border-gray-200">
				<div className="mx-auto max-w-full px-4 md:px-6">
					{/* 모바일 헤더 */}
					<div className="flex h-12 items-center gap-3 md:hidden">
						<SearchBar onSearch={handleSearch} />
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
					<SearchBar onSearch={handleSearch} />
				</search>

				{/* 필터 영역 */}
				<nav
					className="flex gap-2 border-b border-gray-200 py-3 md:flex-row flex-col items-start md:items-center"
					aria-label="상품 필터"
				>
					<CategoryFilter
						selected={selectedCategories}
						onChange={handleCategoryChange}
					>
						<CategoryFilter.Chip value="shoes">신발</CategoryFilter.Chip>
						<CategoryFilter.Chip value="tops">상의</CategoryFilter.Chip>
						<CategoryFilter.Chip value="bottoms">하의</CategoryFilter.Chip>
						<CategoryFilter.Chip value="accessories">
							액세서리
						</CategoryFilter.Chip>
					</CategoryFilter>
					<button
						type="button"
						className="min-w-10 text-gray-400 underline underline-offset-2 transition-colors hover:text-black"
						onClick={handleReset}
					>
						<span className="text-sm">초기화</span>
					</button>
				</nav>

				{/* 상품 수 + 정렬 */}
				<div className="flex items-center justify-between py-3">
					<p className="text-xs text-gray-500 md:text-sm">
						{totalCount > 0 ? `${totalCount.toLocaleString()}개` : "0개"}
					</p>
					<SortSelect value={sort} onChange={handleSortChange} />
				</div>

				{/* 상품 목록 */}
				<section aria-label="상품 목록" className="pb-6">
					<ProductList
						products={products}
						isLoading={isLoading}
						error={error}
						onRetry={handleRetry}
					/>
				</section>
			</main>
		</div>
	);
}

export default App;
