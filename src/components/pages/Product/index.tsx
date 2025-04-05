import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ManagerTemplate from '../../templates/ManagerTemplate';
import ProductManager from './ProductManager';
import ProductNew from './ProductNew';

const Product = () => {
    const tabsProduct = [
        {
            index: 0,
            tab: 'Quản lí phòng',
            key: 'PRODUCT_MANAGER',
            panel: <ProductManager />,
        },
        {
            index: 1,
            tab: 'Tạo phòng',
            key: 'PRODUCT_NEW',
            panel: <ProductNew />,
        },
    ];
    return (
        <ManagerTemplate>
            <Box>
                <Tabs isLazy lazyBehavior="unmount">
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
