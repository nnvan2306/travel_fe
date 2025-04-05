import React from 'react';
import Header from '../organisms/Header';
import { Box } from '@chakra-ui/react';
import { HEADER_HEIGHT } from '../../constants';
import Wrapper from './Wrapper';

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Box pb={10} pt={`${HEADER_HEIGHT}px`}>
            <Header />
            <Wrapper>
                <Box w="full">{children}</Box>
            </Wrapper>
        </Box>
    );
};

export default MainTemPlate;
