import { useEffect, useMemo } from 'react';
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { routes, routesMap } from './routes';
import LoadingOverlay from '../components/atoms/LoadingOverlay';
import { isAdmin } from '../store';

type Props = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const path = useLocation().pathname;
    const navigate = useNavigate();

    const requiresAuth = useMemo(() => routes.find((route) => route.path.includes(path))?.requiresAuth, [path]);
    useEffect(() => {
        if (requiresAuth && !isAdmin) {
            navigate(routesMap.Home);
        }
    }, [requiresAuth, navigate]);

    if (requiresAuth && !isAdmin) {
        return null;
    }

    return (
        <>
            <ScrollRestoration />
            <LoadingOverlay isLoading={false} />
            {children}
        </>
    );
};

export default ProtectedRoute;
