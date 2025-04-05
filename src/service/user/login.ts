import api from '../../libs/axios';
import { MutationConfig } from '../../libs/query';
import { useMutation } from '@tanstack/react-query';
import { LoginType } from '../../type/user';

const login = async (payload: LoginType) => {
    const { data } = await api.post(`/login`, payload);
    return data;
};

type LoginCustomType = {
    mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = ({ mutationConfig }: LoginCustomType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: login,
    });
};
