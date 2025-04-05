import { lazy } from 'react';

export const Home = lazy(() => import('../components/pages/Home'));
export const ProductManager = lazy(() => import('../components/pages/Product/ProductManager'));
export const ProductNew = lazy(() => import('../components/pages/Product/ProductNew'));
export const Product = lazy(() => import('../components/pages/Product'));
export const UserManager = lazy(() => import('../components/pages/UserManager'));
export const OrderManager = lazy(() => import('../components/pages/OrderManager'));
export const Login = lazy(() => import('../components/pages/Login'));
export const Register = lazy(() => import('../components/pages/Register'));
export const RoomDetail = lazy(() => import('../components/pages/RoomDetail'));
