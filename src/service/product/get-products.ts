// import api from '@/libs/axios';
import { QueryConfig } from '../../libs/query';
import api from '../../libs/axios';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_PRODUCTS_QUERY_KEY = 'products';

const getProducts = async () => {
    const { data } = await api.get(`/product`);
    return data;
};

export const getProductsOptions = () =>
    queryOptions({
        queryKey: [GET_PRODUCTS_QUERY_KEY],
        queryFn: () => getProducts(),
    });

type UseGetProductsType = {
    queryConfig?: QueryConfig<typeof getProductsOptions>;
};

export const useGetProducts = ({ queryConfig }: UseGetProductsType) => {
    return useQuery({
        ...getProductsOptions(),
        ...queryConfig,
    });
};
