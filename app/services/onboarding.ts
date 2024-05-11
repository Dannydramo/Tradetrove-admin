import { Axios } from '../helpers/axiosHelper';
import {
    ForgotPasswordProps,
    LoginProps,
    RegisterProps,
    ResetPasswordProps,
} from '../interface/onboarding';
import { getCookie, setCookie } from 'cookies-next';

let status: number;
let message: string;
let data: any;

export const signupVendor = async (payload: RegisterProps) => {
    try {
        const response = await Axios({
            url: 'vendor/auth/register',
            method: 'post',
            body: payload,
        });

        status = 200;
        message = response.message;
        data = response.data.user;
        setCookie('token', response.token, {
            secure: true,
            maxAge: 60 * 6 * 24,
        });
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const loginVendor = async (payload: LoginProps) => {
    try {
        const response = await Axios({
            url: 'vendor/auth/login',
            method: 'post',
            body: payload,
        });

        status = 200;
        message = response.message;
        data = response.data.user;
        setCookie('token', response.token, {
            secure: true,
            maxAge: 60 * 6 * 24,
        });
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const forgotPassword = async (payload: ForgotPasswordProps) => {
    try {
        const response = await Axios({
            url: 'vendor/auth/forgot-password',
            method: 'post',
            body: payload,
        });

        status = 200;
        message = response.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const resetPassword = async (
    payload: ResetPasswordProps,
    token: string
) => {
    try {
        const response = await Axios({
            url: `vendor/auth/reset-password/${token}`,
            method: 'patch',
            body: payload,
        });
        status = 200;
        message = response.message;

        data = response.data.user;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
