import { Axios } from '../helpers/axiosHelper';

let status: number;
let message: string;
let data: any;

export const getAllOrders = async () => {
    try {
        const response = await Axios({
            url: 'orders/all',
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
