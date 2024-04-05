import { create } from 'zustand';
import { VendorProps } from '../interface/vendor';

interface VendorStoreInterface {
    vendor: VendorProps | null;
    setVendor: (vendor: VendorProps | null) => void;
}

export const VendorStore = create<VendorStoreInterface>((set) => ({
    vendor: null,
    setVendor: (vendor) => set({ vendor }),
}));
