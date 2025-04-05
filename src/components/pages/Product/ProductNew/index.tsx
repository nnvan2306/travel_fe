import { Box, Text } from '@chakra-ui/react';
import ProductForm from '../../../organisms/ProductForm';

const ProductNew = () => {
    return (
        <Box px={20}>
            <Text textAlign="center" fontSize={20} textTransform="uppercase">
                TẠo phòng
            </Text>
            <ProductForm />
        </Box>
    );
};

export default ProductNew;
