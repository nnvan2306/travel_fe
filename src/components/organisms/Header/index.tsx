import {
    BoxProps,
    HStack,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    VStack,
} from '@chakra-ui/react';
import { HEADER_HEIGHT } from '../../../constants';
import colors from '../../../constants/colors';
import { Link, useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';
import icons from '../../../constants/icons';
import { infoUser, isAdmin, removeStore } from '../../../store';

type Props = {} & BoxProps;
const Header = ({ ...props }: Props) => {
    const navigate = useNavigate();
    return (
        <HStack
            {...props}
            w="full"
            height={`${HEADER_HEIGHT}px`}
            bg={colors.brand}
            px={10}
            justifyContent="space-between"
            position="fixed"
            top={0}
            right={0}
            left={0}
            zIndex={99}
        >
            <Text
                fontSize={24}
                fontWeight={600}
                color="white"
                cursor="pointer"
                onClick={() => navigate(routesMap.Home)}
            >
                Home
            </Text>

            <HStack>
                <Text color="white">{infoUser?.firstName + infoUser?.lastName}</Text>
                <Popover trigger="hover">
                    <PopoverTrigger>
                        <Icon as={icons.circleUser} color="white" fontSize={28} />
                    </PopoverTrigger>
                    <PopoverContent w={200} zIndex={100}>
                        <PopoverArrow />
                        <PopoverBody px={0} py={4}>
                            <VStack justifyContent="start" gap={0} w="full">
                                {isAdmin ? (
                                    <Link to={routesMap.Product} style={{ width: '100%' }}>
                                        <Text
                                            pl={4}
                                            w="full"
                                            py={2}
                                            _hover={{
                                                background: '#f4f4f4',
                                            }}
                                        >
                                            Quản lý
                                        </Text>
                                    </Link>
                                ) : null}
                                <Text
                                    pl={4}
                                    w="full"
                                    py={2}
                                    cursor="pointer"
                                    _hover={{
                                        background: '#f4f4f4',
                                    }}
                                    onClick={() => removeStore()}
                                >
                                    Đăng xuất
                                </Text>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </HStack>
        </HStack>
    );
};

export default Header;
