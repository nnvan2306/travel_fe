import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { useMutation } from '@tanstack/react-query';

type CreateOrderCustomType = {
    userId: number;
    quantity: number;
    productId: number;
};
const create = async (payload: CreateOrderCustomType) => {
    const { data } = await api.post(`/order`, payload);
    return data;
};

type CreateOrderType = {
    mutationConfig?: MutationConfig<typeof create>;
};

export const useCreateOrder = ({ mutationConfig }: CreateOrderType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: create,
    });
};
