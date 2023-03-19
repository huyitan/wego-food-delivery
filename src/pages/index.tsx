import { MainLayout } from "@/components/Layout";
import Home from "@/features/home";
import { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => <Home />;

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default HomePage;
