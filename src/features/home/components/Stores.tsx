import { useEffect, useMemo, useState } from "react";
import { useStores } from "../api/getStores";
import { StoreCard } from "@/components/Elements";
import { Store } from "../types";
import { StoreCardLoader } from "@/components/Skeletons";
import { matchSorter } from "match-sorter";
import { PAGE_OFFSET, SEARCH_KEY } from "@/utils/constants";

interface StoresProps {
  search?: string;
  categoryId?: string | null;
}

export const Stores: React.FC<StoresProps> = ({ search, categoryId }) => {
  const { isLoading, data: storesData } = useStores();
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Reset paging when changing category
    setPage(0);
  }, [categoryId]);

  const filteredStores = useMemo(() => {
    if (storesData) {
      let data = storesData;

      if (categoryId) {
        data = storesData.filter((s) => s.categoryId === categoryId);
      }

      if (search) {
        data = matchSorter(data, search, { keys: SEARCH_KEY });
      }

      return data;
    }

    return null;
  }, [storesData, categoryId, search]);

  // Paging store list cause large data json
  // TODO: change to paging with api to reduce request time
  const stores = useMemo(() => {
    if (filteredStores) {
      return filteredStores.slice(0, (page + 1) * PAGE_OFFSET);
    }

    return [];
  }, [filteredStores, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSelectStore = (store: Store) => {
    window.alert(`Store: ${store.name}`);
  };

  if (isLoading) {
    return (
      <div className="stores__loader" data-testid="stores-loader">
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
      <div className="stores__error" data-testid="stores-error">
        <h2>Ooops, something went wrong</h2>
        <button className="btn">Refresh</button>
      </div>
    );
  }

  if (!filteredStores || filteredStores.length === 0) {
    return (
      <div className="stores__not-found" data-testid="stores-not-found">
        <h2>No match found for "{search}"</h2>
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
      {stores.length < filteredStores?.length && (
        <div className="stores__load-more">
          <button
            className="btn"
            data-testid="stores-load-more"
            onClick={handleLoadMore}
          >
            + Show More
          </button>
        </div>
      )}
    </div>
  );
};
