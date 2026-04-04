import { ImpressionArea, ProductCard, Spinner } from "@/components";
import { DEFAULT_SORT } from "@/constants";
import { useProductList, useRouteParams } from "@/hooks";

const SCROLL_THRESHOLD = 0.2;
const PAGE_SIZE = 5;

export default function ProductList() {
  const { currentQuery } = useRouteParams();

  const {
    data: products,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
  } = useProductList({
    keyword: currentQuery.search,
    categories: currentQuery.categories,
    sort: currentQuery.sort ?? DEFAULT_SORT,
    size: PAGE_SIZE,
  });
  const sentinelDisabled = !hasNextPage || isFetchingNextPage;

  return (
    <>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ImpressionArea
        areaThreshold={SCROLL_THRESHOLD}
        disabled={sentinelDisabled}
        onImpressionStart={loadMore}
      >
        <EndOfList
          hasMoreData={Boolean(hasNextPage)}
          isFetchingMore={isFetchingNextPage}
        />
      </ImpressionArea>
    </>
  );
}

function EndOfList({
  hasMoreData,
  isFetchingMore,
}: {
  hasMoreData: boolean;
  isFetchingMore: boolean;
}) {
  if (isFetchingMore) {
    return <Spinner />;
  }

  return hasMoreData ? <Spinner /> : <p>더 이상 데이터가 없습니다.</p>;
}
