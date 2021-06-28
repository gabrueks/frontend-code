export interface IUserError {
    key: string;
    value: string;
}

export interface Props {
    children: React.ReactNode;
}

export interface IHandleSubmit {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    province: string;
    zip: string;
    phone: string;
}

export type Address = {
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    countryCodeV2: string;
    firstName: string;
    id: string;
    lastName: string;
    phone: string;
    province: string;
    provinceCode: string;
    zip: string;
    formatted?: any;
    default?: boolean;
    __typename: string;
};

interface PropsProcessed {
    customer: {
        addresses: {
            edges: Address[];
        };
        defaultAddress: Address;
    };
}

export function processedAddresses(props: PropsProcessed): Address[] {
    if (
        props?.customer?.addresses &&
        Array.isArray(props.customer.addresses.edges)
    ) {
        let formatedArray = [];

        formatedArray = props.customer.addresses.edges.map(
            (item: any) => item.node,
        );

        const foundIndex = formatedArray.findIndex(
            (item) => item.id === props.customer.defaultAddress.id,
        );

        formatedArray[foundIndex] = {
            ...formatedArray[foundIndex],
            default: true,
        };

        return formatedArray;
    }
    return [];
}
