import z from 'zod';

export const menuCategorySchema = z.enum(['커피', '음료', '디저트']);

export type MenuCategory = z.infer<typeof menuCategorySchema>;

export const optionTypeSchema = z.enum(['grid', 'select', 'list']);

export type OptionType = z.infer<typeof optionTypeSchema>;

const baseOptionSchema = z.object({
	id: z.number(),
	name: z.string(),
	type: optionTypeSchema,
	required: z.boolean(),
	labels: z.array(z.string()),
	prices: z.array(z.number()),
});

export const gridOptionSchema = baseOptionSchema.extend({
	type: z.literal('grid'),
	col: z.number(),
	icons: z.array(z.string()),
});

export const selectOptionSchema = baseOptionSchema.extend({
	type: z.literal('select'),
});

export const listOptionSchema = baseOptionSchema.extend({
	type: z.literal('list'),
	minCount: z.number(),
	maxCount: z.number(),
});

export const menuOptionSchema = z.discriminatedUnion('type', [
	gridOptionSchema,
	selectOptionSchema,
	listOptionSchema,
]);

export type MenuOption = z.infer<typeof menuOptionSchema>;

export const menuItemSchema = z.object({
	id: z.string(),
	category: menuCategorySchema,
	title: z.string(),
	description: z.string(),
	price: z.number(),
	iconImg: z.string(),
	optionIds: z.array(z.number()),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

export const categoriesResponseSchema = z.object({
	categories: z.array(menuCategorySchema),
});

export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;

export const menuItemsResponseSchema = z.object({
	items: z.array(menuItemSchema),
});

export type MenuItemsResponse = z.infer<typeof menuItemsResponseSchema>;

export const menuItemResponseSchema = z.object({
	item: menuItemSchema,
});

export type MenuItemResponse = z.infer<typeof menuItemResponseSchema>;

export const optionsResponseSchema = z.object({
	options: z.array(menuOptionSchema),
});

export type OptionsResponse = z.infer<typeof optionsResponseSchema>;
