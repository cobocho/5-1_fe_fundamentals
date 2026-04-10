import { useQueryState } from 'nuqs';
import { CategoryTab } from '@/domain/catalog/components/category-tab/category-tab';

export function MenuPage() {
	const [category, setCategory] = useQueryState('category');

	return (
		<div className="p-4">
			<CategoryTab
				value={category}
				onSelect={setCategory}
			/>
		</div>
	);
}
