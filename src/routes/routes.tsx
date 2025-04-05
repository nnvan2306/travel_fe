import { Home, Login, OrderManager, Product, Register, RoomDetail, UserManager } from './index';

export const routes = [
    {
        name: 'Home',
        path: '/',
        element: <Home />,
        requiresAuth: false,
    },
    {
        name: 'Product',
        path: '/admin/product',
        element: <Product />,
        requiresAuth: true,
    },
    {
        name: 'UserManager',
        path: '/admin/users',
        element: <UserManager />,
        requiresAuth: true,
    },
    {
        name: 'OrderManager',
        path: '/admin/orders',
        element: <OrderManager />,
        requiresAuth: true,
    },
    {
        name: 'Login',
        path: '/login',
        element: <Login />,
        requiresAuth: false,
    },
    {
        name: 'Register',
        path: '/register',
        element: <Register />,
        requiresAuth: false,
    },
    {
        name: 'RoomDetail',
        path: '/detail/:id',
        element: <RoomDetail />,
        requiresAuth: false,
    },
] as const;

type RouteName = (typeof routes)[number]['name'];

type RoutesMap = {
    [K in RouteName]: (typeof routes)[number]['path'];
};

export const routesMap = ((): RoutesMap => {
    return routes.reduce((acc, route) => {
        acc[route.name] = route.path;
        return acc;
    }, {} as RoutesMap);
})();
