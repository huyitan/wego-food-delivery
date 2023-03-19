import { useMemo, useState } from "react";
import { useStores } from "../api/getStores";
import { StoreCard } from "@/components/Elements";
import { useCategories } from "../api/getCategories";

interface StoresProps {}

const PAGE_OFFSET = 9;

export const Stores: React.FC<StoresProps> = () => {
  const [page, setPage] = useState(0);
  const { isLoading, data: storesData } = useStores();
  const { data: categoriesData } = useCategories();

  // TODO: change to paging with api to reduce request time
  // Paging store list cause large data json
  const stores = useMemo(() => {
    if (storesData) {
      return storesData.slice(0, (page || 1) * PAGE_OFFSET);
    }

    return [];
  }, [storesData, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (isLoading) return <div>loading</div>;

  if (!storesData) {
    return (
      <div className="stores__error">
        <h2>Ooops, something went wrong</h2>
        <button className="btn">Refresh</button>
      </div>
    );
  }

  return (
    <div className="stores">
      <div className="stores__list">
        {stores?.map((store) => (
          <StoreCard key={store.id} data={store} />
        ))}
      </div>
      {stores.length < storesData?.length && (
        <div className="stores__load-more">
          <button className="btn" onClick={handleLoadMore}>
            + Show More
          </button>
        </div>
      )}
    </div>
  );
};
