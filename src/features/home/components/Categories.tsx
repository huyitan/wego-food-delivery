import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCategories } from "../api/getCategories";
import { Category } from "../types";
import { ALL_CATEGORIES_ID } from "@/utils/constans";
import { useRouter } from "next/router";

const allCategories: Category = { id: ALL_CATEGORIES_ID, name: "All" };

interface Categories {}

export const Categories: React.FC<Categories> = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES_ID);
  const { isLoading, data } = useCategories();
  const isFirstTimeRender = useRef(true);

  const categoriesData = useMemo(() => {
    if (data && data.length > 0) {
      return [allCategories, ...data];
    }

    return data || [];
  }, [data]);

  useEffect(() => {
    // get category from url query string on first render
    const categoryName = router.query.category as string;

    if (isFirstTimeRender.current && data && categoryName) {
      isFirstTimeRender.current = false;

      const category = data.find(
        (c) => c?.name?.toLowerCase() === categoryName.toLowerCase()
      );

      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [router, data]);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category.id);

    // Update selected category to url query string
    // trigger filter on stores list & get better UX
    router.replace(
      { query: { ...router.query, t: category.name } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) return null;

  return (
    <div className="categories">
      {categoriesData.map((category) => (
        <div
          key={category?.id}
          className={clsx(
            "categories__item",
            category?.id === selectedCategory && "categories__item--selected"
          )}
          onClick={() => handleSelectCategory(category)}
        >
          {category?.name}
        </div>
      ))}
    </div>
  );
};
