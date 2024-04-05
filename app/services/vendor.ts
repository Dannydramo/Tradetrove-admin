import { Axios } from '../helpers/axiosHelper';
import { getCookie } from 'cookies-next';
import { VendorProps } from '../interface/vendor';

let status: number;
let message: string;
let data: any;

export const getVendorDetails = async () => {
    const token = getCookie('token');
    try {
        const response = await Axios({
            url: 'vendor/get-vendor-details',
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

export const updateVendorDetails = async (
    vendor: VendorProps,
    logo: string
) => {
    const token = getCookie('token');
    const payload = {
        ...vendor,
        logo,
    };

    try {
        const response = await Axios({
            url: 'vendor/update-details',
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
