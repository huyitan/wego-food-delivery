import { useEffect, useMemo, useState } from "react";
import { useStores } from "../api/getStores";
import { StoreCard } from "@/components/Elements";
import { Store } from "../types";
import { StoreCardLoader } from "@/components/Skeletons";

interface StoresProps {
  categoryId?: string | null;
}

const PAGE_OFFSET = 9;

export const Stores: React.FC<StoresProps> = ({ categoryId }) => {
  const { isLoading, data: storesData } = useStores();
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Reset paging when changing category
    setPage(0);
  }, [categoryId]);

  const storesByCategories = useMemo(() => {
    if (storesData && categoryId) {
      return storesData.filter((s) => s.categoryId === categoryId);
    }

    return storesData;
  }, [storesData, categoryId]);

  // Paging store list cause large data json
  // TODO: change to paging with api to reduce request time
  const stores = useMemo(() => {
    if (storesByCategories) {
      return storesByCategories.slice(0, (page + 1) * PAGE_OFFSET);
    }

    return [];
  }, [storesByCategories, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSelectStore = (store: Store) => {
    window.alert(`Store: ${store.name}`);
  };

  if (isLoading) {
    return (
      <div className="stores__loader">
        <StoreCardLoader />
        <StoreCardLoader />
        <StoreCardLoader />
        <StoreCardLoader />
        <StoreCardLoader />
        <StoreCardLoader />
      </div>
    );
  }

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
          <StoreCard key={store.id} data={store} onClick={handleSelectStore} />
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
