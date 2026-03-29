export const queryKeys = {
  products: ['products'] as const,
  autocomplete: (keyword: string) => ['autocomplete', keyword] as const,
};
