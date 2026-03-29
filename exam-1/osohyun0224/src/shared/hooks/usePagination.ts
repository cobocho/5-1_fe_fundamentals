import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const PAGE_SIZE = 20;

export function usePagination<T>(items: T[]) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const prevItemsRef = useRef(items);

  useEffect(() => {
    if (prevItemsRef.current !== items) {
      setVisibleCount(PAGE_SIZE);
      prevItemsRef.current = items;
    }
  }, [items]);

  const totalCount = items.length;
  const hasMore = visibleCount < totalCount;

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount],
  );

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  return { visibleItems, totalCount, hasMore, loadMore };
}
