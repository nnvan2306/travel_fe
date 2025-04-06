import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ManagerTemplate from '../../templates/ManagerTemplate';
import ProductManager from './ProductManager';
import ProductNew from './ProductNew';
import { useEffect, useState } from 'react';
import { isAdmin } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';

const Product = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const tabsProduct = [
        {
            index: 0,
            tab: 'Quản lí phòng',
            key: 'PRODUCT_MANAGER',
            panel: <ProductManager onChangeTab={() => setTabIndex(1)} />,
        },
        {
            index: 1,
            tab: 'Tạo phòng',
            key: 'PRODUCT_NEW',
            panel: <ProductNew />,
        },
    ];

    useEffect(() => {
        if (!isAdmin) {
            navigate(routesMap.Home);
        }
    }, [navigate]);
    return (
        <ManagerTemplate>
            <Box>
                <Tabs index={tabIndex} onChange={setTabIndex} isLazy lazyBehavior="unmount">
                    <TabList>
                        {tabsProduct.map((item) => {
                            return <Tab key={item.key}>{item.tab}</Tab>;
                        })}
                    </TabList>
                    <TabPanels>
                        {tabsProduct.map((item) => {
                            return <TabPanel key={item.key}>{item.panel}</TabPanel>;
                        })}
                    </TabPanels>
                </Tabs>
            </Box>
        </ManagerTemplate>
    );
};

export default Product;
