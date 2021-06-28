import { useCallback, useMemo, useState } from "react";
import { TItem, TUseModal } from "./interface";

const useModal = (): TUseModal => {
    const [modalItem, setModalItem] = useState<TItem>(undefined);

    const setModalItemCallback = useCallback(
        (item: TItem) => setModalItem(item),
        [],
    );

    return {
        modalItem: useMemo(() => modalItem, [modalItem]),
        setModalItem: setModalItemCallback,
    };
};

export default useModal;
