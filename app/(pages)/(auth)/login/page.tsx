import React from 'react';
import LoginForm from './LoginForm';
import Link from 'next/link';

const Login = () => {
    return (
        <div className="bg-[#F6F8FF] min-h-screen">
            <div className="w-[98%] mx-auto max-w-[1600px]">
                <div>TradeTrove</div>
                <div className="flex justify-center items-center h-[90vh]">
                    <div className="flex justify-center items-center flex-col">
                        <h1 className="font-bold text-2xl md:text-3xl">
                            Hi Vendor,
                        </h1>
                        <p className="text-sm mt-3 mb-8">
                            Welcome to TradeTrove Vendor Dashboard{' '}
                        </p>

                        <LoginForm />
                        <div className="mt-6 text-xs flex gap-1 text-start">
                            <p>{"Don't"} have an account?</p>
                            <Link href={'/signup'} className="underline">
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
