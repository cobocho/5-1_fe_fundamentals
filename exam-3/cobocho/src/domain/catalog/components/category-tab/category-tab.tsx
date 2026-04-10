import { useSuspenseQuery } from '@tanstack/react-query';
import { catalogQuery, type MenuItem } from '../../api';
import { SegmentControl } from '@/shared/components/segment-control';

interface CategoryTabProps {
	value?: MenuItem['category'] | null;
	onSelect?: (category: MenuItem['category']) => void;
}

export function CategoryTab({ value, onSelect }: CategoryTabProps) {
	const { data } = useSuspenseQuery(catalogQuery.categories());
	const categories = data.categories;

	const resolvedValue =
		value && categories.includes(value) ? value : categories[0];

	return (
		<SegmentControl.Root
			value={resolvedValue}
			onSelect={(v) => onSelect?.(v)}
		>
			{categories.map((category) => (
				<SegmentControl.Item
					key={category}
					value={category}
				>
					{category}
				</SegmentControl.Item>
			))}
		</SegmentControl.Root>
	);
}
