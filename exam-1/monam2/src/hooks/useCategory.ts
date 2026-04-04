import { useRouteParams } from "@/hooks";
import { type Category, isCategory } from "@/types";

export default function useCategory() {
  const { updateQuery, currentQuery } = useRouteParams();
  const selectedCategories =
    currentQuery.categories?.split(",").filter(isCategory) ?? [];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const nextCategory = isCategory(value) ? value : undefined;

    if (!nextCategory) {
      return;
    }

    const nextCategories = checked
      ? [...new Set([...selectedCategories, nextCategory])]
      : selectedCategories.filter((category) => category !== nextCategory);

    updateQuery({
      categories: serializeCategories(nextCategories),
    });
  };

  return {
    selectedCategories,
    onChange,
  };
}

function serializeCategories(categories: Category[]) {
  return categories.length > 0 ? categories.join(",") : undefined;
}
