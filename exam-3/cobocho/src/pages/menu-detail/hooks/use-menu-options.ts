import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { catalogQuery, type MenuOption } from '@/domain/catalog/api';

export function useMenuOptions(itemId: string) {
	const { data: itemData } = useSuspenseQuery(catalogQuery.item(itemId));
	const { data: optionsData } = useSuspenseQuery(catalogQuery.options());

	const item = itemData.item;

	const options = useMemo(
		() =>
			item.optionIds
				.map((id) => optionsData.options.find((o) => o.id === id))
				.filter((o): o is MenuOption => o != null),
		[item.optionIds, optionsData.options],
	);

	return { item, options };
}
