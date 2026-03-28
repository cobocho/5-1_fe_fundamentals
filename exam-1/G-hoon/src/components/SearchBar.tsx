import { Search } from "lucide-react";
import { useState } from "react";

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
	onSearch: (keyword: string) => void;
	placeholder?: string;
}

function SearchBar({
	onSearch,
	placeholder = "상품을 검색해 보세요",
}: SearchBarProps) {
	const [keyword, setKeyword] = useState("");
	// TODO
	const [suggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const submit = (value: string) => {
		onSearch(value);
		setShowSuggestions(false);
	};

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		submit(keyword);
	};

	return (
		<search className="relative w-full">
			<form className="flex h-9 md:h-11" onSubmit={handleSubmit}>
				<label className="relative flex-1">
					<span className="sr-only">상품 검색</span>
					<input
						type="search"
						className="h-full w-full border border-gray-300 bg-gray-50 pl-4 pr-10 text-sm outline-none placeholder:text-gray-400 focus:border-black md:border-black md:bg-white"
						placeholder={placeholder}
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					<button
						type="submit"
						className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 md:hidden"
						aria-label="검색"
					>
						<Search className="h-4 w-4" />
					</button>
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
