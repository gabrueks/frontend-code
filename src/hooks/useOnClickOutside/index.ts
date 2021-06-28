import { RefObject } from "react";
import { useEffect } from "react";

const useOnClickOutside = (
    ref: RefObject<HTMLDivElement> | null,
    handler: (event: MouseEvent) => void,
): void => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref?.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
