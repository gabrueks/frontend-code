import {
    INITIAL_DEFAULT_ADDRESS,
    TUseCustomerAddress,
    TProps,
} from "./interface";

const useCustomerAddress = ({ customer }: TProps): TUseCustomerAddress => {
    const processedDefaultAddress = () => {
        if (customer) {
            const { defaultAddress } = customer;

            return defaultAddress ?? INITIAL_DEFAULT_ADDRESS;
        }
        return INITIAL_DEFAULT_ADDRESS;
    };

    const processedCountAddress = () => {
        if (customer) {
            const { addresses } = customer;

            return addresses?.edges.length ?? 0;
        }
        return 0;
    };

    const processedAddresses = () => {
        if (customer) {
            const { addresses } = customer;
            return addresses?.edges.map((item) => item.node) ?? [];
        }
        return [];
    };

    return {
        addresses: processedAddresses(),
        defaultAddress: processedDefaultAddress(),
        countAddresses: processedCountAddress(),
    };
};

export default useCustomerAddress;
