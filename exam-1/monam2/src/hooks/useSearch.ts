import { useEffect, useState } from "react";
import { useAutoComplete, useDebounce, useRouteParams } from "@/hooks";

export default function useSearch() {
  const { currentQuery, updateQuery } = useRouteParams();

  const [keyword, setKeyword] = useState(currentQuery.search ?? "");
  const debouncedKeyword = useDebounce(keyword.trim(), 500);

  const { data: autocompletedData } = useAutoComplete({
    keyword: debouncedKeyword,
  });

  useEffect(() => {
    setKeyword(currentQuery.search ?? "");
  }, [currentQuery.search]);

  const options =
    autocompletedData?.suggestions.map((suggestion) => ({
      label: suggestion,
      value: suggestion,
    })) ?? [];

  const onChange = (value: string) => {
    setKeyword(value);
  };

  const search = (nextKeyword = keyword) => {
    const trimmedKeyword = nextKeyword.trim();

    setKeyword(trimmedKeyword);
    updateQuery({
      search: trimmedKeyword || undefined,
    });
  };

  return {
    keyword,
    options,
    onChange,
    search,
  };
}
