import { UserResponseType } from '../type/user';

export const isLogin = typeof window !== 'undefined' ? window.localStorage.getItem('isLogin') === 'true' : false;

export const isAdmin = typeof window !== 'undefined' ? window.localStorage.getItem('isAdmin') === 'true' : false;

export const infoUser =
    typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('infoUser') || 'null') : null;

export const setStore = (data: UserResponseType): void => {
    if (typeof window === 'undefined') return;
    const local = window.localStorage;
    local.setItem('isLogin', 'true');
    local.setItem('isAdmin', data.role === 'admin' ? 'true' : 'false');
    local.setItem('infoUser', JSON.stringify(data));
};

export const removeStore = (): void => {
    if (typeof window === 'undefined') return;
    const local = window.localStorage;
    local.removeItem('isLogin');
    local.removeItem('isAdmin');
    local.removeItem('infoUser');
};
