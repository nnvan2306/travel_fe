import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { useMutation } from '@tanstack/react-query';
import { RegisterType } from '../../type/user';

const register = async (payload: RegisterType) => {
    const { data } = await api.post(`/register`, payload);
    return data;
};

type RegisterCustomType = {
    mutationConfig?: MutationConfig<typeof register>;
};

export const useRegister = ({ mutationConfig }: RegisterCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: register,
    });
};
