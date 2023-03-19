import ContentLoader from "react-content-loader";

interface CategoriesLoaderProps {}

export const CategoriesLoader: React.FC<CategoriesLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 500 60"
    backgroundColor="#e1e1e1"
    foregroundColor="#cacaca"
    {...props}
  >
    <rect x="0" y="6" rx="4" ry="4" width="500" height="48" />
  </ContentLoader>
);
