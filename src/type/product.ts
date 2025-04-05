import * as yup from 'yup';
import { productFormSchema } from '../components/organisms/ProductForm/form-schema';

export type ProductFormType = yup.InferType<typeof productFormSchema>;

export type ProductResponseType = {
    id: number;
    name: string;
    description: string;
    price: string;
    address: string;
    roomType: string;
    available: boolean;
    images: { id: number; url: string }[];
};
