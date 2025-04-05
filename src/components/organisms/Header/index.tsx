import { BoxProps, HStack } from '@chakra-ui/react';
import { HEADER_HEIGHT } from '../../../constants';
import colors from '../../../constants/colors';

type Props = {} & BoxProps;
const Header = ({ ...props }: Props) => {
    return (
        <HStack
            {...props}
            w="full"
            height={HEADER_HEIGHT}
            bg={colors.brand}
            px={4}
            justifyContent="space-between"
            position="fixed"
            top={0}
            right={0}
            left={0}
        ></HStack>
    );
};

export default Header;
