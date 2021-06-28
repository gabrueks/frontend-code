import { lazy } from "react";

const OrderHistory = lazy(() => import("./OrderHistory"));
const OrderProducts = lazy(() => import("./OrderProducts"));

export default {
    OrderHistory,
    OrderProducts,
};
