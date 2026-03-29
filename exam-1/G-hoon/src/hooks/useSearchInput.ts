import { useCallback, useDeferredValue, useEffect, useState } from 'react';
import { useProductFilters } from './useProductFilters';

export function useSearchInput() {
  const { keyword: urlKeyword, setKeyword: setUrlKeyword } =
    useProductFilters();
  const [inputValue, setInputValue] = useState(urlKeyword);

  const deferredKeyword = useDeferredValue(inputValue);
  const hasValue = inputValue.length > 0;

  // URL keyword가 외부에서 변경되면 (초기화 등) 동기화
  useEffect(() => {
    setInputValue(urlKeyword);
  }, [urlKeyword]);

  const submit = useCallback(
    (value: string) => {
      setInputValue(value);
      setUrlKeyword(value);
    },
    [setUrlKeyword],
  );

  const clear = useCallback(() => {
    setInputValue('');
    setUrlKeyword('');
  }, [setUrlKeyword]);

  return {
    inputValue,
    setInputValue,
    deferredKeyword,
    hasValue,
    submit,
    clear,
  };
}
