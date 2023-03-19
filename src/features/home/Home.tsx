import { SearchInput } from "@/components/Elements";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <SearchInput />
    </div>
  );
};

export default Home;
