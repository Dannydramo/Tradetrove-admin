import React from 'react';
import SettingsLayout from '../components/SettingsLayout';
import PasswordForm from '../components/PasswordForm';

const Security = () => {
    return (
        <>
            <SettingsLayout>
                <main className="md:px-8 w-full border-l">
                    <div className="border-b pb-4">
                        <h1 className="text-xl font-bold">Security</h1>
                    </div>
                    <div className="mt-4">
                        <p className="my-4 font-semibold text-lg">
                            Change Password
                        </p>
                        <PasswordForm />
                    </div>
                </main>
            </SettingsLayout>
        </>
    );
};

export default Security;
