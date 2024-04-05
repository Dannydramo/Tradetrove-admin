'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { forgotPasswordValidationSchema } from '@/app/validators/onboarding';

import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    useState,
} from 'react';
import { ForgotPasswordProps } from '@/app/interface/onboarding';
import * as Yup from 'yup';
import { toast } from 'sonner';

const ForgotPasswordForm = () => {
    const [formData, setFormData] = useState<ForgotPasswordProps>({
        email: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleValueChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await forgotPasswordValidationSchema.validate(formData, {
                abortEarly: false,
            });

            setErrors({});
            try {
                console.log(formData);
            } catch (error) {
                toast.error(
                    'Unable to forget password. Please try aagain later'
                );
            }
        } catch (validationErrors) {
            const errorsObj: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error: any) => {
                    errorsObj[error.path] = error.message;
                });
                setErrors(errorsObj);
            }
        }
    };
    return (
        <div className="w-80 sm:min-w-[450px]">
            <form onSubmit={handleSubmit}>
                <div className="">
                    <Label className="mb-2 text-sm">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="vendor@gmail.com"
                        className="text-sm outline-none bg-transparent"
                        value={formData.email}
                        onChange={handleValueChange}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs">
                            {errors.email}
                        </span>
                    )}
                </div>

                <Button
                    variant="outline"
                    type="submit"
                    className="w-full mt-6 h-12 bg-[#4F80E1] hover:bg-[#4F80E1] hover:text-white text-white"
                >
                    Send Reset Link
                </Button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
