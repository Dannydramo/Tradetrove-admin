import { Axios } from '../helpers/axiosHelper';
import { VendorProps } from '../interface/vendor';

let status: number;
let message: string;
let data: any;

export const getVendorDetails = async () => {
    try {
        const response = await Axios({
            url: 'vendor/get-vendor-details',
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

export const updateVendorDetails = async (
    vendor: VendorProps,
    logo: string
) => {
    const payload = {
        ...vendor,
        logo,
    };
    console.log(payload);

    try {
        const response = await Axios({
            url: 'vendor/update-details',
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

export const getVendorStatistics = async () => {
    try {
        const response = await Axios({
            url: 'vendor/statistics',
            method: 'get',
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data };
};

export const getChartData = async () => {
    try {
        const response = await Axios({
            url: 'vendor/monthly-amount',
            method: 'get',
        });

        status = 200;
        message = response.message;
        data = response.data;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data };
};

export const getUserDetailsById = async (userId: string) => {
    try {
        const response = await Axios({
            url: `vendor/get-user-details?userId=${userId}`,
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
