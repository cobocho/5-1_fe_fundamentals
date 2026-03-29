import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/api/queryKeys';
import { fetchAutocomplete } from '@/features/search/api/fetchAutocomplete';

export function useAutocomplete(keyword: string) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  const trimmed = debouncedKeyword.trim();

  const { data: suggestions = [], isLoading: loading } = useQuery({
    queryKey: queryKeys.autocomplete(trimmed),
    queryFn: () => fetchAutocomplete(trimmed),
    enabled: trimmed.length > 0,
    staleTime: 60 * 1000,
  });

  return { suggestions: trimmed ? suggestions : [], loading };
}
