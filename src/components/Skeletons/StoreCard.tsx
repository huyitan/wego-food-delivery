import ContentLoader from "react-content-loader";

interface StoreCardLoaderProps {}

export const StoreCardLoader: React.FC<StoreCardLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 300 300"
    backgroundColor="#e1e1e1"
    foregroundColor="#cacaca"
    {...props}
  >
    <rect x="0" y="245" rx="4" ry="4" width="73" height="20" />
    <rect x="91" y="245" rx="4" ry="4" width="63" height="20" />
    <rect x="170" y="245" rx="4" ry="4" width="53" height="20" />
    <rect x="0" y="0" rx="4" ry="4" width="300" height="180" />
    <rect x="0" y="200" rx="4" ry="4" width="189" height="28" />
  </ContentLoader>
);
