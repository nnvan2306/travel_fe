import { Box, Button, HStack, Icon, Image, Input, Text } from '@chakra-ui/react';
import MainTemPlate from '../../templates/MainTemPlate';
import { useGetProduct } from '../../../service/product/get-product';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductResponseType } from '../../../type/product';
import { formatCurrencyVN } from '../../../helpers/formatVnd';
import icons from '../../../constants/icons';
import { useCreateOrder } from '../../../service/order/create';
import { infoUser, isLogin } from '../../../store';
import { routesMap } from '../../../routes/routes';

const RoomDetail = () => {
    const { id } = useParams();
    const [currentImage, setCurrentImage] = useState<string>('');
    const [quantity, setQuantity] = useState(0);

    const navigate = useNavigate();

    const { data } = useGetProduct({ id: Number(id) || 0 });
    const room = useMemo(() => data?.data, [data]) as ProductResponseType;

    const order = useCreateOrder({
        mutationConfig: {
            onSuccess() {},
            onError() {},
        },
    });

    const handleOrder = useCallback(() => {
        if (!isLogin) {
            navigate(routesMap.Login);
            return;
        }

        const dataBuider = {
            userId: infoUser.id,
            productId: room?.id,
            quantity: quantity,
        };
        order.mutate(dataBuider);
    }, [navigate, order, quantity, room?.id]);

    useEffect(() => {
        if (room) {
            setCurrentImage(room.images[0].url);
        }
    }, [room]);

    return (
        <MainTemPlate>
            <HStack justifyContent="space-between" alignItems="start" pt={20}>
                <Box w="65%" p={5} border="1px solid" borderColor="#ddd" shadow="lg" rounded={10}>
                    <Image
                        src={currentImage}
                        w={'full'}
                        h={460}
                        objectFit="cover"
                        border="1px solid"
                        borderColor="#ddd"
                        rounded={10}
                        mb={1}
                    />
                    <HStack mb={10}>
                        {room?.images?.length
                            ? room?.images?.map((item) => {
                                  return (
                                      <Image
                                          src={item.url}
                                          key={item.id}
                                          w="110px"
                                          h="80px"
                                          rounded={4}
                                          border={item?.url === currentImage ? '2px solid' : ''}
                                          borderColor="blue.400"
                                          cursor="pointer"
                                          onClick={() => setCurrentImage(item?.url)}
                                      />
                                  );
                              })
                            : null}
                    </HStack>

                    <Text fontSize={24} fontWeight={500} mb={2}>
                        {room?.name}
                    </Text>
                    <Text mb={2}>
                        <Icon as={icons.location} /> : {room?.address}
                    </Text>
                    <Text color="#E03C31" fontSize={18} mb={5}>
                        Mức giá : {formatCurrencyVN(Number(room?.price))} / tháng
                    </Text>
                    <Text fontSize={20} fontWeight={500} mb={2}>
                        Thông tin mô tả
                    </Text>
                    <Text whiteSpace="pre-line">{room?.description}</Text>
                </Box>

                <Box w="28%" p={5} border="1px solid" borderColor="#ddd" shadow="lg" rounded={10}>
                    <Text mb={1}>Số lượng</Text>
                    <HStack gap={0} mb={4}>
                        <Button
                            rounded={0}
                            onClick={() => {
                                if (quantity <= 0) {
                                    return;
                                } else {
                                    setQuantity(quantity - 1);
                                }
                            }}
                        >
                            <Icon as={icons.remove} />
                        </Button>
                        <Input
                            rounded={0}
                            type="number"
                            w={28}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <Button
                            rounded={0}
                            onClick={() => {
                                setQuantity(quantity + 1);
                            }}
                        >
                            <Icon as={icons.add} />
                        </Button>
                    </HStack>
                    <Text mb={4} color="#E03C31" fontSize={18}>
                        Tiền thuê : {formatCurrencyVN(quantity * Number(room?.price))}
                    </Text>
                    <Button w="full" onClick={handleOrder}>
                        Đặt ngay
                    </Button>
                </Box>
            </HStack>
        </MainTemPlate>
    );
};

export default RoomDetail;
