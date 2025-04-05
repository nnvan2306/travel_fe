import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { useMutation } from '@tanstack/react-query';
import { ProductFormType } from '../../type/product';

const addNewProduct = async (payload: ProductFormType) => {
    const { data } = await api.post(`/product`, payload);
    return data;
};

type AddNewProductType = {
    mutationConfig?: MutationConfig<typeof addNewProduct>;
};

export const useAddNewProduct = ({ mutationConfig }: AddNewProductType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: addNewProduct,
    });
};
