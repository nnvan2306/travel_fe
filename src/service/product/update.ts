import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { useMutation } from '@tanstack/react-query';
import { ProductFormType } from '../../type/product';

type PayloadType = ProductFormType & { id: number; listFile: number[] };
const updateProduct = async (payload: PayloadType) => {
    const { data } = await api.put(`/product`, payload);
    return data;
};

type UpdateProductType = {
    mutationConfig?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({ mutationConfig }: UpdateProductType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: updateProduct,
    });
};
