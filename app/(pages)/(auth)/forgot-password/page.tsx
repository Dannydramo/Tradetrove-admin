import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import Link from 'next/link';

const ForgotPassword = () => {
    return (
        <div className="bg-[#F6F8FF] min-h-screen">
            <div className="w-[98%] mx-auto max-w-[1600px]">
                <div>TradeTrove</div>
                <div className="flex justify-center items-center h-[90vh]">
                    <div className="flex justify-center w-80 sm:min-w-96 items-center flex-col">
                        <h1 className="font-bold text-2xl md:text-3xl">
                            Forgot Your Password?
                        </h1>
                        <p className="text-sm text-center mt-3 mb-8">
                            No worries! Please enter your email address below
                            and we'll send you a link to reset your password.
                        </p>
                        <ForgotPasswordForm />
                        <div className="mt-6 text-xs flex gap-1 text-start">
                            <p>Already have an account?</p>
                            <Link href={'/login'} className="underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
