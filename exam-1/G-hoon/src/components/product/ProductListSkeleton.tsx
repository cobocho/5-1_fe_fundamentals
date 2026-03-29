const SKELETON_COUNT = 12;

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-5/6 bg-gray-200" />
      <div className="pt-1.5 md:pt-2.5">
        <div className="h-3 w-12 rounded bg-gray-200" />
        <div className="mt-1.5 h-3 w-full rounded bg-gray-200" />
        <div className="mt-1 h-3 w-2/3 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-16 rounded bg-gray-200" />
        <div className="mt-1.5 h-3 w-8 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-x-4 md:gap-y-8"
      role="status"
      aria-label="상품 로딩 중"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <SkeletonCard
          key={`skeleton-${
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton card
            i
          }`}
        />
      ))}
    </div>
  );
}

export default ProductListSkeleton;
