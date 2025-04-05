import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { useMutation } from '@tanstack/react-query';

const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post(`/upload`, formData);
    return data;
};

type AddNewProductType = {
    mutationConfig?: MutationConfig<typeof uploadFile>;
};

export const useUploadFile = ({ mutationConfig }: AddNewProductType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: uploadFile,
    });
};
