export interface RegisterProps {
    businessName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface ForgotPasswordProps {
    email: string;
}
