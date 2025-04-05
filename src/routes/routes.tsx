import { Home } from './index';

export const routes = [
    {
        name: 'Home',
        path: '/',
        element: <Home />,
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
