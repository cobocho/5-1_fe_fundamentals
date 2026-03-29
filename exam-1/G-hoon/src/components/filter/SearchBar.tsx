import { debounce } from 'es-toolkit';
import { CircleX, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAutocomplete } from '@/hooks/useAutocomplete';
import { useProductFilters } from '@/hooks/useProductFilters';

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

function SuggestionList({ suggestions, onSelect }: SuggestionListProps) {
  if (suggestions.length === 0) return null;

  return (
    <ul
      className="absolute top-full right-0 left-0 z-20 max-h-64 overflow-y-auto border border-t-0 border-gray-200 bg-white shadow-sm"
      aria-label="검색어 추천"
    >
      {suggestions.map((suggestion) => (
        <li key={suggestion}>
          <button
            type="button"
            className="w-full px-4 py-2.5 text-left text-sm text-gray-800 transition-colors hover:bg-gray-100"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </button>
        </li>
      ))}
    </ul>
  );
}

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder = '상품을 검색해 보세요' }: SearchBarProps) {
  const { keyword: urlKeyword, setKeyword: setUrlKeyword } =
    useProductFilters();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasValue, setHasValue] = useState(urlKeyword.length > 0);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = urlKeyword;
    }
    setHasValue(urlKeyword.length > 0);
    setDebouncedKeyword(urlKeyword ? urlKeyword : '');
  }, [urlKeyword]);

  const debouncedSetKeyword = useMemo(
    () => debounce((value: string) => setDebouncedKeyword(value), 300),
    [],
  );

  const suggestions = useAutocomplete(debouncedKeyword);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const submit = useCallback(
    (value: string) => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
      debouncedSetKeyword.cancel();
      setDebouncedKeyword('');
      setHasValue(value.length > 0);
      setUrlKeyword(value);
      setShowSuggestions(false);
    },
    [setUrlKeyword, debouncedSetKeyword],
  );

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    submit(inputRef.current?.value ?? '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHasValue(value.length > 0);
    debouncedSetKeyword(value);
    setShowSuggestions(true);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    setHasValue(false);
    debouncedSetKeyword.cancel();
    setDebouncedKeyword('');
    setUrlKeyword('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <search className="relative w-full" ref={containerRef}>
      <form className="flex h-9 md:h-11" onSubmit={handleSubmit}>
        <label className="relative flex-1">
          <span className="sr-only">상품 검색</span>
          <input
            ref={inputRef}
            type="search"
            className="h-full w-full border border-gray-300 bg-gray-50 pl-4 pr-10 text-sm outline-none placeholder:text-gray-400 focus:border-black md:border-black md:bg-white [&::-webkit-search-cancel-button]:hidden"
            placeholder={placeholder}
            defaultValue={urlKeyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
          />
          {hasValue ? (
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 transition-colors hover:text-gray-500"
              aria-label="검색어 지우기"
              onClick={handleClear}
            >
              <CircleX className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 md:hidden"
              aria-label="검색"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </label>
        <button
          type="submit"
          className="hidden h-full border border-black bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-gray-800 md:block"
        >
          검색
        </button>
      </form>

      {showSuggestions && (
        <SuggestionList suggestions={suggestions} onSelect={submit} />
      )}
    </search>
  );
}

export default SearchBar;
