import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Store } from '../types';

export const getStores = (): Promise<Store[]> => {
  return axios.get(`/v3/a24cfec5-f76c-410b-a5ac-9f63fab28abb`);
};

type QueryFnType = typeof getStores;

type UseStoresOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useStores = ({ config }: UseStoresOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['stores'],
    queryFn: () => getStores(),
  });
};