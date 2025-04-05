import * as yup from 'yup';
import { searchGeneFormSchema } from '../components/organisms/SearchForm/form-schema';
import { searchTranslationFormSchema } from '../components/organisms/SearchTranslationForm/form-schema';

export type SearchGeneFormType = yup.InferType<typeof searchGeneFormSchema>;
export type SearchTranslationFormType = yup.InferType<typeof searchTranslationFormSchema>;
