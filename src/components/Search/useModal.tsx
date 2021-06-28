import { useState } from "react";

export type UseModalResponse = {
    isShown: boolean;
    toggleSearch: () => void;
};

export const useModal = (): UseModalResponse => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const toggleSearch = () => setIsShown(!isShown);
    return {
        isShown,
        toggleSearch,
    };
};
