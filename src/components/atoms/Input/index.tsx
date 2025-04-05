import { Box, Input, InputProps, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ProductFormType } from '../../../type/product';

type Props = {
    field: keyof Pick<ProductFormType, 'name' | 'description' | 'address' | 'price' | 'roomType'>;
    label: string;
} & InputProps;
const InputCustom = ({ field, label, ...props }: Props) => {
    const { register } = useFormContext<ProductFormType>();
    return (
        <Box>
            <Text mb={3}>{label}</Text>
            <Input mb={1} {...register(field)} {...props} />
        </Box>
    );
};

export default InputCustom;
