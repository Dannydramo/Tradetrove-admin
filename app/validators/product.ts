import * as Yup from 'yup';

export const productValidationSchema = Yup.object().shape({
    productName: Yup.string().required('Product Name is required'),
    description: Yup.string().required('Product Description is required'),
    category: Yup.string().required('Product category is required'),
    price: Yup.string().required('Product Price is required'),
});
