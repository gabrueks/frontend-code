import { lazy } from "react";

const Account = lazy(() => import("../pages/Account"));
const AccountAddresses = lazy(() => import("../pages/AccountAddresses"));
const AccountOrderDetail = lazy(() => import("../pages/AccountOrderDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Collections = lazy(() => import("../pages/Collections"));
const Collection = lazy(() => import("../pages/Collection"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Policy = lazy(() => import("../pages/Policy"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const SignUp = lazy(() => import("../pages/SignUp"));
const search = lazy(() => import("../pages/Search"));
const Seller = lazy(() => import("../pages/Seller"));

export enum routes {
    ACCOUNT = "/account",
    ACCOUNT_ADDRESSES = "/account/addresses",
    ACCOUNT_ORDER_DETAIL = "/account/orders/:id",
    CART = "/cart",
    CHECKOUT = "/checkout",
    COLLECTIONS = "/collections",
    COLLECTION = "/collections/:collection",
    HOME = "/",
    LOGIN = "/account/login",
    PRIVACY_POLICY = "/policies/privacy-policy",
    PRODUCT = "/products/:handle",
    SIGNUP = "/account/register",
    SEARCH = "/search",
    TERMS_OF_SERVICE = "/policies/terms-of-service",
    REFUND_POLICY = "/policies/refund-policy",
    SELLER_PROFILE = "/pages/seller-profile",
}

export type routeParams = {
    [routes.COLLECTION]: {
        collection: string;
    };
    [routes.PRODUCT]: {
        handle: string;
    };
    [routes.ACCOUNT_ORDER_DETAIL]: {
        id: string;
    };
};

export type routeSearch = {
    [routes.CHECKOUT]: {
        step?:
            | "contact_information"
            | "shipping_method"
            | "payment_method"
            | "success";
    };
    [routes.COLLECTION]: {
        sort_by: string;
    };
    [routes.LOGIN]: {
        flow?: routes.CART;
    };
    [routes.PRODUCT]: {
        variant?: string;
    };
};

export type routeState = {
    [routes.LOGIN]: {
        from?: {
            pathname: string;
            search?: string;
            state?: any;
        };
    };
};

export const routeProps = {
    [routes.ACCOUNT]: {
        key: 1,
        path: routes.ACCOUNT,
        exact: true,
        component: Account,
        private: true,
    },
    [routes.ACCOUNT_ADDRESSES]: {
        key: 2,
        path: routes.ACCOUNT_ADDRESSES,
        exact: true,
        component: AccountAddresses,
        private: true,
    },
    [routes.ACCOUNT_ORDER_DETAIL]: {
        key: 3,
        path: routes.ACCOUNT_ORDER_DETAIL,
        exact: true,
        component: AccountOrderDetail,
        private: true,
    },
    [routes.CART]: {
        key: 4,
        path: routes.CART,
        exact: true,
        component: Cart,
        private: false,
    },
    [routes.CHECKOUT]: {
        key: 5,
        path: routes.CHECKOUT,
        exact: true,
        component: Checkout,
        private: true,
    },
    [routes.COLLECTIONS]: {
        key: 6,
        path: routes.COLLECTIONS,
        exact: true,
        component: Collections,
        private: false,
    },
    [routes.COLLECTION]: {
        key: 7,
        path: routes.COLLECTION,
        component: Collection,
        private: false,
    },
    [routes.HOME]: {
        key: 8,
        path: routes.HOME,
        exact: true,
        component: Home,
        private: false,
    },
    [routes.LOGIN]: {
        key: 9,
        path: routes.LOGIN,
        exact: true,
        component: Login,
        private: false,
    },
    [routes.PRODUCT]: {
        key: 10,
        path: routes.PRODUCT,
        component: ProductDetail,
        private: false,
    },
    [routes.SIGNUP]: {
        key: 11,
        path: routes.SIGNUP,
        exact: true,
        component: SignUp,
        private: false,
    },
    [routes.PRIVACY_POLICY]: {
        key: 12,
        path: routes.PRIVACY_POLICY,
        exact: true,
        component: Policy,
        private: false,
    },
    [routes.TERMS_OF_SERVICE]: {
        key: 13,
        path: routes.TERMS_OF_SERVICE,
        exact: true,
        component: Policy,
        private: false,
    },
    [routes.SEARCH]: {
        key: 14,
        path: routes.SEARCH,
        exact: true,
        component: search,
        private: false,
    },
    [routes.REFUND_POLICY]: {
        key: 15,
        path: routes.REFUND_POLICY,
        exact: true,
        component: Policy,
        private: false,
    },
    [routes.SELLER_PROFILE]: {
        key: 16,
        path: routes.SELLER_PROFILE,
        exact: true,
        component: Seller,
        private: false,
    },
};
