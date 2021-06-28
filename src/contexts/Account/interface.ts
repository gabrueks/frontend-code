import { TUseCustomerAddress } from "./useCustomerAddress/interface";
import { TUseCustomerInfo } from "./useCustomerInfo/interface";
import { TUseOrderHistory } from "./useOrderHistory/interface";
import { TUseOrderDetail } from "./useOrderDetail/interface";

export type ContextType = TUseCustomerAddress &
    TUseCustomerInfo &
    TUseOrderHistory &
    TUseOrderDetail;
