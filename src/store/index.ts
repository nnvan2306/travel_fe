import { UserResponseType } from '../type/user';

export const isLogin = window.localStorage.getItem('isLogin');
export const isAdmin = window.localStorage.getItem('isAdmin') === 'true';
export const infoUser = JSON.parse(window.localStorage.getItem('infoUser') || '');

export const setStore = (data: UserResponseType) => {
    const local = window.localStorage;
    local.setItem('isLogin', 'true');
    if (data?.role === 'admin') {
        local.setItem('isAdmin', 'true');
    } else {
        local.setItem('isAdmin', 'false');
    }
    local.setItem('infoUser', JSON.stringify(data));
};
