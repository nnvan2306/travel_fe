import { routesMap } from '../routes/routes';
import icons from './icons';

export const personalBrand = 'Cassava';
export const HEADER_HEIGHT = 80;
export const WIDTH_SIDEBAR = 300;

export const sidebars = [
    { label: 'Phòng', icon: icons.room, path: routesMap.Product },
    { label: 'Order', icon: icons.order, path: routesMap.OrderManager },
    { label: 'User', icon: icons.user, path: routesMap.UserManager },
];
