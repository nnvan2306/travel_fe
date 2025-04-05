import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Text,
    useBreakpointValue,
    useMediaQuery,
    IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useLogin } from '../../../service/user/login';
import toast from '../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../libs/axios';
import { setStore } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isMobile] = useMediaQuery('(max-width: 768px)');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const login = useLogin({
        mutationConfig: {
            onSuccess: (data) => {
                setStore(data?.data);
                toast({
                    title: 'Đăng nhập thành công!',
                    status: 'success',
                });
                navigate(routesMap.Home);
            },
            onError: (error) => {
                console.log(error);
                if (isAxiosError(error)) {
                    toast({
                        title: getAxiosError(error),
                        status: 'error',
                    });
                }
            },
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login.mutate(formData);
    };

    return (
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
            <Box
                bg="white"
                p={8}
                rounded="lg"
                boxShadow="xl"
                w={useBreakpointValue({ base: '90%', sm: '400px' })}
                border="1px solid #ddd"
                borderColor="gray.300"
            >
                <Heading textAlign="center" fontSize={isMobile ? '2xl' : '3xl'} mb={6} color="blue.600">
                    Đăng Nhập
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                type="email"
                                placeholder="Nhập email của bạn"
                                bg="gray.50"
                                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182ce' }}
                            />
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Mật khẩu</FormLabel>
                            <Input
                                value={formData.password}
                                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu của bạn"
                                bg="gray.50"
                                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182ce' }}
                            />
                            <IconButton
                                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                onClick={() => setShowPassword(!showPassword)}
                                position="absolute"
                                right="10px"
                                top="40px"
                                variant="link"
                                color="gray.500"
                            />
                        </FormControl>

                        <Button
                            colorScheme="blue"
                            type="submit"
                            width="full"
                            mt={4}
                            _hover={{ bg: 'blue.500' }}
                            _active={{ bg: 'blue.600' }}
                        >
                            Đăng Nhập
                        </Button>

                        <Text textAlign="center" mt={4}>
                            Chưa có tài khoản?{' '}
                            <a href="/register" style={{ color: '#3182ce' }}>
                                Đăng ký
                            </a>
                        </Text>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
