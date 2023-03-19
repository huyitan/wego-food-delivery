import { SearchInput } from "@/components/Elements";
import { Categories } from "./components/Categories";
import { Stores } from "./components/Stores";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div className="home__navbar">
        <SearchInput
          className="home__search"
          placeholder="Enter restaurant name..."
        />
      </div>
      <div className="home__categories">
        <Categories />
      </div>
      <div className="home__stores">
        <Stores />
      </div>
    </div>
  );
};

export default Home;
