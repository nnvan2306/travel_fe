import { Box, Text, Textarea, TextareaProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ProductFormType } from '../../../type/product';

type Props = {
    field: keyof Pick<ProductFormType, 'description'>;
    label: string;
} & TextareaProps;
const TextAreaCustom = ({ field, label, ...props }: Props) => {
    const { register } = useFormContext<ProductFormType>();
    return (
        <Box>
            <Text mb={3}>{label}</Text>
            <Textarea mb={1} {...register(field)} {...props} />
        </Box>
    );
};

export default TextAreaCustom;
