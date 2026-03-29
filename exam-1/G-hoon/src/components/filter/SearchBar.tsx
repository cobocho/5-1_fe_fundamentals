import { CircleX, Search } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useAutocomplete } from '@/hooks/useAutocomplete';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useSearchInput } from '@/hooks/useSearchInput';

function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  if (!highlight) return <>{text}</>;

  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);

  return (
    <>
      {before}
      <mark className="bg-transparent font-bold text-black">{match}</mark>
      {after}
    </>
  );
}

interface SuggestionListProps {
  suggestions: string[];
  activeIndex: number;
  keyword: string;
  listboxId: string;
  onSelect: (suggestion: string) => void;
}

function SuggestionList({
  suggestions,
  activeIndex,
  keyword,
  listboxId,
  onSelect,
}: SuggestionListProps) {
  const activeRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeIndex 변경 시 스크롤 필요
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (suggestions.length === 0) return null;

  return (
    <div
      id={listboxId}
      className="absolute top-full right-0 left-0 z-20 max-h-64 overflow-y-auto border border-t-0 border-gray-200 bg-white shadow-sm"
      role="listbox"
      aria-label="검색어 추천"
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion}
          ref={index === activeIndex ? activeRef : null}
          id={`${listboxId}-option-${index}`}
          role="option"
          tabIndex={-1}
          aria-selected={index === activeIndex}
          className={`cursor-pointer px-4 py-2.5 text-sm text-gray-800 transition-colors ${
            index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(suggestion)}
          onKeyDown={() => {}}
        >
          <HighlightedText text={suggestion} highlight={keyword} />
        </div>
      ))}
    </div>
  );
}

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder = '상품을 검색해 보세요' }: SearchBarProps) {
  const {
    inputValue,
    setInputValue,
    deferredKeyword,
    hasValue,
    submit,
    clear,
  } = useSearchInput();
  const containerRef = useRef<HTMLElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const listboxId = useId();

  const suggestions = useAutocomplete(deferredKeyword);
  const isListboxOpen = showSuggestions && suggestions.length > 0;

  const handleSelect = (value: string) => {
    submit(value);
    setShowSuggestions(false);
  };

  const {
    activeIndex,
    handleKeyDown,
    reset: resetNavigation,
  } = useKeyboardNavigation({
    options: suggestions,
    isOpen: isListboxOpen,
    onSelect: handleSelect,
    onClose: () => setShowSuggestions(false),
  });

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
        resetNavigation();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [resetNavigation]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleSelect(inputValue);
  };

  const handleClear = () => {
    clear();
    setShowSuggestions(false);
    resetNavigation();
  };

  return (
    <search className="relative w-full" ref={containerRef}>
      <form className="flex h-9 md:h-11" onSubmit={handleSubmit}>
        <label className="relative flex-1">
          <span className="sr-only">상품 검색</span>
          <input
            type="search"
            role="combobox"
            aria-expanded={isListboxOpen}
            aria-controls={listboxId}
            aria-activedescendant={
              activeIndex >= 0
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            aria-autocomplete="list"
            className="h-full w-full border border-gray-300 bg-gray-50 pl-4 pr-10 text-sm outline-none placeholder:text-gray-400 focus:border-black md:border-black md:bg-white [&::-webkit-search-cancel-button]:hidden"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
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

      {isListboxOpen && (
        <SuggestionList
          suggestions={suggestions}
          activeIndex={activeIndex}
          keyword={deferredKeyword}
          listboxId={listboxId}
          onSelect={handleSelect}
        />
      )}
    </search>
  );
}

export default SearchBar;
