import {
    Box,
    BoxProps,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Grid,
    GridItem,
    HStack,
    Icon,
    Image,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ProductFormType } from '../../../type/product';
import { defaultProductFormSchema, productFormSchema } from './form-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import InputCustom from '../../atoms/Input';
import { useAddNewProduct } from '../../../service/product/create-product';
import toast from '../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../libs/axios';
import { useUploadFile } from '../../../service/product/upload-file';
import { useRef, useState } from 'react';
import icons from '../../../constants/icons';
import TextAreaCustom from '../../atoms/TextArea';

type Props = {} & BoxProps;
const ProductForm = ({ ...props }: Props) => {
    const [files, setFiles] = useState<string[]>([]);
    const ref = useRef<HTMLInputElement>(null);

    const formMethods = useForm<ProductFormType>({
        resolver: yupResolver(productFormSchema),
        defaultValues: defaultProductFormSchema,
    });

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        watch,
    } = formMethods;

    const addNew = useAddNewProduct({
        mutationConfig: {
            onSuccess: () => {
                formMethods.reset(defaultProductFormSchema);
                setFiles([]);
                toast({
                    title: 'Tạo phòng thành công',
                    status: 'success',
                });
            },
            onError: (error) => {
                if (isAxiosError(error)) {
                    toast({
                        title: getAxiosError(error),
                        status: 'error',
                    });
                }
            },
        },
    });

    const uploadFile = useUploadFile({
        mutationConfig: {
            onSuccess(data) {
                const newFiles = [...files, data?.data?.url_public];
                setFiles(newFiles);
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

    const handleClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0] as File;
            uploadFile.mutate(file);
        }
    };

    watch();

    return (
        <Box {...props}>
            <form
                onSubmit={handleSubmit((data) =>
                    addNew.mutate({
                        ...data,
                        listFile: files,
                    }),
                )}
            >
                <FormProvider {...formMethods}>
                    <Box mb={6}>
                        <HStack justifyContent="end">
                            <Button
                                onClick={() => handleClick()}
                                disabled={uploadFile.isPending || files.length >= 5}
                                leftIcon={<Icon as={icons.upload} />}
                                mb={1}
                            >
                                Chọn file upload
                            </Button>
                        </HStack>
                        <input type="file" hidden ref={ref} onChange={(e) => handleChange(e)} />
                        <Flex
                            w="full"
                            border="1px dashed"
                            borderColor="#ccc"
                            rounded={10}
                            p={2}
                            gap={4}
                            h={files.length ? 'auto' : '120px'}
                        >
                            {files?.length
                                ? files?.map((item, index) => {
                                      return (
                                          <Box key={index} position="relative">
                                              <Icon
                                                  as={icons.close}
                                                  position="absolute"
                                                  fontSize={24}
                                                  color="red"
                                                  right={0}
                                                  top={0}
                                                  cursor="pointer"
                                                  onClick={() => {
                                                      const newFiles = files.filter((item) => item !== item);
                                                      setFiles(newFiles);
                                                  }}
                                              />
                                              <Image
                                                  src={item}
                                                  alt="image"
                                                  w="100px"
                                                  objectFit="contain"
                                                  border="1px solid"
                                                  borderColor="#ccc"
                                                  rounded={10}
                                              />
                                          </Box>
                                      );
                                  })
                                : null}
                        </Flex>
                    </Box>
                    <Grid templateColumns="repeat(2, 1fr)" columnGap={100} rowGap={6} mb={6}>
                        <GridItem>
                            <FormControl isInvalid={Boolean(errors.name)}>
                                <InputCustom field="name" label="Tên" />
                                <FormErrorMessage>{errors.name ? errors.name.message : null}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem rowSpan={3}>
                            <FormControl isInvalid={Boolean(errors.description)}>
                                <TextAreaCustom field="description" label="Mô tả" minHeight={250} rows={3} />
                                <FormErrorMessage>
                                    {errors.description ? errors.description.message : null}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl isInvalid={Boolean(errors.address)}>
                                <InputCustom field="address" label="Địa chỉ" />
                                <FormErrorMessage>{errors.address ? errors.address.message : null}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl isInvalid={Boolean(errors.price)}>
                                <InputCustom field="price" label="Giá" />
                                <FormErrorMessage>{errors.price ? errors.price.message : null}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl isInvalid={Boolean(errors.roomType)}>
                                <InputCustom field="roomType" label="Loại phòng" />
                                <FormErrorMessage>{errors.roomType ? errors.roomType.message : null}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl isInvalid={Boolean(errors.available)}>
                                <Text mb={3}>Trạng thái</Text>
                                <RadioGroup
                                    onChange={(e) => setValue('available', e === 'true')}
                                    value={String(getValues('available'))}
                                >
                                    <Stack direction="row">
                                        <Radio value="true">Còn phòng</Radio>
                                        <Radio value="false">Hết phong</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </GridItem>
                    </Grid>

                    <Flex justifyContent="start">
                        <Button type="submit" right={0}>
                            Tạo phòng
                        </Button>
                    </Flex>
                </FormProvider>
            </form>
        </Box>
    );
};

export default ProductForm;
