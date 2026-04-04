import { useQuery } from "@tanstack/react-query";
import { getAutoComplete } from "@/apis";

const QUERY_KEY = (keyword: string) => ["autoComplete", keyword];

export default function useAutoComplete({ keyword }: { keyword: string }) {
  const normalizedKeyword = keyword.trim();

  return useQuery({
    queryKey: QUERY_KEY(normalizedKeyword),
    queryFn: () => getAutoComplete({ keyword: normalizedKeyword }),
    enabled: normalizedKeyword.length > 0,
  });
}

useAutoComplete.getQueryKey = (keyword: string) => QUERY_KEY(keyword);
