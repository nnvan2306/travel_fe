import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { Suspense } from 'react';
import { Progress } from '@chakra-ui/react';
import { GlobalProvider } from './contexts/GlobalContext';

const router = createBrowserRouter(
    routes.map((route) => ({
        ...route,
        element: <ProtectedRoute {...route}>{route.element}</ProtectedRoute>,
    })),
);

function App() {
    return (
        <Suspense fallback={<Progress size="xs" isIndeterminate position="fixed" top={0} left={0} right={0} h={0.5} />}>
            <GlobalProvider>
                <RouterProvider router={router} />
            </GlobalProvider>
        </Suspense>
    );
}

export default App;
