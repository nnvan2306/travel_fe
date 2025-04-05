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
    IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRegister } from '../../../service/user/register';
import toast from '../../../libs/toast';
import { isAxiosError } from 'axios';
import { getAxiosError } from '../../../libs/axios';
import { RegisterType } from '../../../type/user';
import { useNavigate } from 'react-router-dom';
import { routesMap } from '../../../routes/routes';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const register = useRegister({
        mutationConfig: {
            onSuccess: () => {
                toast({
                    title: 'Đăng ký thành công!',
                    status: 'success',
                });
                navigate(routesMap.Login);
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

    const handleRegister = () => {
        register.mutate(formData as RegisterType);
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
                <Heading textAlign="center" fontSize="3xl" mb={6} color="blue.600">
                    Đăng Ký
                </Heading>
                <form onSubmit={handleRegister}>
                    <Stack spacing={4}>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>Họ</FormLabel>
                            <Input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Nhập họ của bạn"
                                bg="gray.50"
                                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182ce' }}
                            />
                        </FormControl>

                        <FormControl id="lastName" isRequired>
                            <FormLabel>Tên</FormLabel>
                            <Input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Nhập tên của bạn"
                                bg="gray.50"
                                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182ce' }}
                            />
                        </FormControl>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email của bạn"
                                bg="gray.50"
                                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182ce' }}
                            />
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Mật khẩu</FormLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
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

                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>Xác nhận mật khẩu</FormLabel>
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu của bạn"
                                bg="gray.50"
                                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182ce' }}
                            />
                            <IconButton
                                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                            Đăng Ký
                        </Button>

                        <Text textAlign="center" mt={4}>
                            Đã có tài khoản?{' '}
                            <a href="/login" style={{ color: '#3182ce' }}>
                                Đăng nhập
                            </a>
                        </Text>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
