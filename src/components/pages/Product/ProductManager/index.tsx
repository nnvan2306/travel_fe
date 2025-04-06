import {
    Box,
    Button,
    HStack,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useGetProducts } from '../../../../service/product/get-products';
import TableCusTom from '../../../molecules/Table';
import { useMemo, useState } from 'react';
import icons from '../../../../constants/icons';
import { useDeleteProduct } from '../../../../service/product/delete';
import { isAxiosError } from 'axios';
import toast from '../../../../libs/toast';
import { getAxiosError } from '../../../../libs/axios';
import { useSearchParams } from 'react-router-dom';

type Props = {
    onChangeTab: () => void;
};
const ProductManager = ({ onChangeTab }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: IsOpenImages, onOpen: onOpenImages, onClose: onCloseImages } = useDisclosure();
    const [idDelete, setIdDelete] = useState(0);
    const [listImages, setListImages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, refetch } = useGetProducts({});
    const rooms = useMemo(
        () =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?.data?.map((item: any) => {
                return {
                    ...item,
                    description: item?.description?.slice(0, 160) + '...',
                    available: item.available ? 'Phòng trống' : 'Phòng đã có người thuê',
                    action: (
                        <HStack>
                            <Button
                                onClick={() => {
                                    setIdDelete(item.id);
                                    onOpen();
                                }}
                            >
                                <Icon as={icons.trash} color="red" />
                            </Button>
                            <Button
                                onClick={() => {
                                    searchParams.set('id', String(item?.id));
                                    setSearchParams(searchParams);
                                    onChangeTab();
                                }}
                            >
                                <Icon as={icons.pen} color="orange" />
                            </Button>
                            <Button
                                onClick={() => {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    setListImages(item?.images?.map((item: any) => item.url));
                                    onOpenImages();
                                }}
                            >
                                <Icon as={icons.eye} color="orange" />
                            </Button>
                        </HStack>
                    ),
                };
            }) || [],
        [data],
    );

    const deleteProduct = useDeleteProduct({
        mutationConfig: {
            onSuccess() {
                refetch();
                onClose();
            },
            onError(error) {
                if (isAxiosError(error)) {
                    toast({
                        title: getAxiosError(error),
                        status: 'error',
                    });
                }
            },
        },
    });

    return (
        <Box px={20}>
            <Text textAlign="center" fontSize={20} textTransform="uppercase">
                Danh sách phòng
            </Text>
            <TableCusTom
                columns={[
                    { key: 'name', label: 'Tên', w: '20%' },
                    { key: 'description', label: 'Mô tả', w: '30%' },
                    { key: 'address', label: 'Địa chỉ', w: '20%' },
                    { key: 'price', label: 'Giá', w: '10%' },
                    { key: 'roomType', label: 'Loại phòng', w: '10%' },
                    { key: 'available', label: 'Trạng thái', w: '10%' },
                    { key: 'action', label: '', w: '10%' },
                ]}
                data={rooms}
            />

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIdDelete(0);
                    onClose();
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Bạn cóp chắc muốn xóa ?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            rightIcon={<Icon as={icons.trash} />}
                            onClick={() => deleteProduct.mutate(idDelete)}
                        >
                            Xóa
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIdDelete(0);
                                onClose();
                            }}
                        >
                            Không
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={IsOpenImages} onClose={onCloseImages} size="4xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Danh sách ảnh</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={10}>
                        <HStack>
                            {listImages?.length
                                ? listImages.map((item, index) => {
                                      return (
                                          <Image
                                              key={index}
                                              src={item}
                                              w={100}
                                              rounded={10}
                                              border="1px solid"
                                              borderColor="#ccc"
                                              objectFit="contain"
                                          />
                                      );
                                  })
                                : null}
                        </HStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductManager;
