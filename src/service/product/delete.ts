import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { useMutation } from '@tanstack/react-query';

const deleteProduct = async (id: number) => {
    const { data } = await api.delete(`/product/${id}`);
    return data;
};

type DeleteProductType = {
    mutationConfig?: MutationConfig<typeof deleteProduct>;
};

export const useDeleteProduct = ({ mutationConfig }: DeleteProductType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: deleteProduct,
    });
};
