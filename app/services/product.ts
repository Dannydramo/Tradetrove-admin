import { Axios } from '../helpers/axiosHelper';
import { getCookie } from 'cookies-next';
import { ProductProps } from '../interface/product';

let status: number;
let message: string;
let data: any;

export const addProduct = async (products: ProductProps, images: string[]) => {
    const payload = {
        ...products,
        images,
    };
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'product/create',
            method: 'post',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const getProductsByVendor = async () => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: `vendor/products`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const getProductDetails = async (productId: string) => {
    try {
        const response = await Axios({
            url: `/product/${productId}`,
            method: 'get',
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const editProduct = async (products: ProductProps) => {
    const payload = {
        ...products,
    };
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: `/product/edit/${payload._id}`,
            method: 'patch',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const deleteProduct = async (payload: ProductProps) => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: `/product/delete/${payload._id}`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
