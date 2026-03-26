import {
	ToggleGroup,
	ToggleGroupItem,
} from '@/components/toggle-group/toggle-group';
import { cn } from '@/libs/cn';
import type {
	Category,
	ProductsRequest,
	ProductsSortOption,
} from '../../api/products.types';
import { CATEGORY_LABELS, SORT_OPTION_LABELS } from '../../api/products.types';
import { ProductAutoComplete } from '../product-autocomplete/product-autocomplete';

interface ProductSearchFilterProps {
	value: ProductsRequest;
	onChange: (value: Partial<ProductsRequest>) => void;
}

export const ProductSearchFilter = ({
	value,
	onChange,
}: ProductSearchFilterProps) => {
	const categories = value.categories ?? [];

	const resetFilters = () => {
		onChange({
			categories: null,
			keyword: null,
			sort: null,
			page: 1,
			size: 20,
		});
	};

	return (
		<div className="flex items-center gap-4">
			<ProductAutoComplete
				value={value.keyword ?? ''}
				onChange={(keyword) => onChange({ keyword: keyword || null })}
			/>
			<ToggleGroup
				type="multiple"
				value={categories}
				onChange={(next) =>
					onChange({
						categories: next.length > 0 ? (next as Category[]) : null,
					})
				}
			>
				{(Object.keys(CATEGORY_LABELS) as Category[]).map((category) => (
					<ToggleGroupItem
						key={category}
						value={category}
					>
						{CATEGORY_LABELS[category]}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<ToggleGroup
				type="single"
				value={value.sort}
				onChange={(next) =>
					onChange({ sort: next as ProductsSortOption | null })
				}
			>
				{(Object.keys(SORT_OPTION_LABELS) as ProductsSortOption[]).map(
					(option) => (
						<ToggleGroupItem
							key={option}
							value={option}
						>
							{SORT_OPTION_LABELS[option]}
						</ToggleGroupItem>
					),
				)}
			</ToggleGroup>
			<button
				type="button"
				onClick={resetFilters}
			>
				초기화
			</button>
		</div>
	);
};
