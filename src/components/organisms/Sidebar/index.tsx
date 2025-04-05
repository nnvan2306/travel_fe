import { Box, BoxProps, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { HEADER_HEIGHT, sidebars, WIDTH_SIDEBAR } from '../../../constants';
import { useNavigate } from 'react-router-dom';

type Props = {} & BoxProps;
const Sidebar = ({ ...props }: Props) => {
    const navigate = useNavigate();
    return (
        <Box
            {...props}
            width={WIDTH_SIDEBAR}
            shadow="lg"
            height={`calc(100vh - ${HEADER_HEIGHT}px)`}
            position="fixed"
            top={`${HEADER_HEIGHT}px`}
            left={0}
            bg="white"
            zIndex={1}
        >
            <VStack width="full">
                {sidebars.map((item, index) => {
                    return (
                        <HStack
                            key={index}
                            w="full"
                            py={2}
                            px={4}
                            borderBottom="1px solid"
                            borderColor="#ccc"
                            cursor={'pointer'}
                            _hover={{ opacity: 0.7 }}
                            onClick={() => navigate(item.path)}
                        >
                            <Icon as={item.icon} />
                            <Text>{item.label}</Text>
                        </HStack>
                    );
                })}
            </VStack>
        </Box>
    );
};

export default Sidebar;
