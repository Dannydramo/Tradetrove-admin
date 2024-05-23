import { Axios } from '../helpers/axiosHelper';
import { ProductProps } from '../interface/product';

let status: number;
let message: string;
let data: any;

export const addProduct = async (products: ProductProps) => {
    const payload = {
        ...products,
    };

    try {
        const response = await Axios({
            url: 'product/create',
            method: 'post',
            body: payload,
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

export const getProductsByVendor = async () => {
    try {
        const response = await Axios({
            url: `vendor/products`,
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

    try {
        const response = await Axios({
            url: `/product/edit/${payload._id}`,
            method: 'patch',
            body: payload,
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

export const deleteProductById = async (payload: string) => {
    try {
        const response = await Axios({
            url: `/product/delete/${payload}`,
            method: 'delete',
        });

        status = 200;
        message = response.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};
