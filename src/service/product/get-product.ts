// import api from '@/libs/axios';
import { QueryConfig } from '../../libs/query';
import api from '../../libs/axios';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const GET_PRODUCT_QUERY_KEY = 'product';

const getProduct = async (id: number) => {
    const { data } = await api.get(`/product/${id}`);
    return data;
};

export const getProductOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_PRODUCT_QUERY_KEY],
        queryFn: () => getProduct(id),
    });

type UseGetProductType = {
    queryConfig?: QueryConfig<typeof getProductOptions>;
    id: number;
};

export const useGetProduct = ({ queryConfig, id }: UseGetProductType) => {
    return useQuery({
        ...getProductOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
