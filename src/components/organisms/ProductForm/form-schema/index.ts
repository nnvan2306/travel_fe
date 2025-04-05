import * as yup from 'yup';

export const productFormSchema = yup.object().shape({
    name: yup.string().required('Tên không được để trống'),
    description: yup.string().required('Mô tả không được để trống'),
    price: yup.string().required('Giá không được để trống'),
    address: yup.string().required('Địa chỉ không được để trống'),
    roomType: yup.string().required('Loại phòng không được để trống'),
    available: yup.boolean(),
    listFile: yup.array(),
});

export const defaultProductFormSchema = {
    name: '',
    description: '',
    price: '',
    address: '',
    roomType: '',
    available: true,
    listFile: [],
};
