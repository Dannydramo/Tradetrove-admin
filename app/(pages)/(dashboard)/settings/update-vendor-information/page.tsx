import React from 'react';
import SettingsLayout from '../components/SettingsLayout';
import VendorForm from '../components/VendorForm';

const UpdateVendorInformation = () => {
    return (
        <>
            <SettingsLayout>
                <main className="md:px-8 w-full md:border-l">
                    <div className="border-b pb-4">
                        <h1 className="text-base sm:text-xl font-bold">
                            Update Vendors Information
                        </h1>
                    </div>
                    <div className="mt-4">
                        <VendorForm />
                    </div>
                </main>
            </SettingsLayout>
        </>
    );
};

export default UpdateVendorInformation;
