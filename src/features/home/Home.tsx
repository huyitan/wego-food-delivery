import { SearchInput } from "@/components/Elements";
import { useDebounce } from "@/hooks";
import { useCallback, useState } from "react";
import { Categories } from "./components/Categories";
import { Stores } from "./components/Stores";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 350);
  const [category, setCategory] = useState<string | null>(null);

  const handleSelectCategory = useCallback((id: string | null) => {
    setCategory(id);
  }, []);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="home">
      <div className="home__navbar" data-testid="navbar">
        <SearchInput
          className="home__search"
          placeholder="Enter restaurant name..."
          onChange={handleSearch}
        />
      </div>
      <div className="home__categories" data-testid="categories">
        <Categories onSelected={handleSelectCategory} />
      </div>
      <div className="home__stores" data-testid="stores">
        <Stores search={debouncedSearchKeyword} categoryId={category} />
      </div>
    </div>
  );
};
