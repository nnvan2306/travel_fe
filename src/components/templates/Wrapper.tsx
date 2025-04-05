import { BoxProps, Container } from '@chakra-ui/react';

type Props = { children: React.ReactNode } & BoxProps;
const Wrapper = ({ children, ...props }: Props) => {
    return (
        <Container maxW={'80%'} {...props}>
            {children}
        </Container>
    );
};

export default Wrapper;
