import { useQuery } from '@tanstack/react-query';
import { getAutocomplete } from '@/api';

export function useAutocomplete(keyword: string) {
  const trimmedKeyword = keyword.trim();
  const { data } = useQuery({
    queryKey: ['autocomplete', trimmedKeyword],
    queryFn: () => getAutocomplete(trimmedKeyword),
    enabled: trimmedKeyword.length > 0,
  });

  return data?.suggestions ?? [];
}
