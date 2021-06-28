import { TProductDetail } from "../../ProductDetail";

export type TItem =
    | (TProductDetail & { buySimilar: boolean; quantity: number })
    | undefined;

export type TUseModal = {
    modalItem: TItem;
    setModalItem: (item: TItem) => void;
};
