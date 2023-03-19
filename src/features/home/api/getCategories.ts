import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Category } from '../types';

export const getCategories = (): Promise<Category[]> => {
  return axios.get(`/v3/f25ced0a-9ff7-4996-bdc7-430f281c48db`);
};

type QueryFnType = typeof getCategories;

type UseCategoriesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCategories = ({ config }: UseCategoriesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
};