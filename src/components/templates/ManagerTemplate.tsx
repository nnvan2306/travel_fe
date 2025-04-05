import { Box, Flex } from '@chakra-ui/react';
import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';
import { HEADER_HEIGHT, WIDTH_SIDEBAR } from '../../constants';

type Props = {
    children: React.ReactNode;
};
const ManagerTemplate = ({ children }: Props) => {
    return (
        <Box pb={10} pt={`${HEADER_HEIGHT}px`}>
            <Header />
            <Flex>
                <Sidebar />
                <Box pl={4} w="full" ml={WIDTH_SIDEBAR}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default ManagerTemplate;
