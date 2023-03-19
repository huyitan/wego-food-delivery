import { SearchInput } from "@/components/Elements";
import { useCallback, useState } from "react";
import { Categories } from "./components/Categories";
import { Stores } from "./components/Stores";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [category, setCategory] = useState<string | null>(null);

  const handleSelectCategory = useCallback((id: string | null) => {
    setCategory(id);
  }, []);

  return (
    <div className="home">
      <div className="home__navbar">
        <SearchInput
          className="home__search"
          placeholder="Enter restaurant name..."
        />
      </div>
      <div className="home__categories">
        <Categories onSelected={handleSelectCategory} />
      </div>
      <div className="home__stores">
        <Stores categoryId={category} />
      </div>
    </div>
  );
};

export default Home;
