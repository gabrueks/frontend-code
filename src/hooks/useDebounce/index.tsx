import { useState, useEffect } from "react";

const useDebounce = <ValueType,>(
    value: ValueType,
    delay: number,
): ValueType => {
    const [debouncedValue, setDebouncedValue] = useState<ValueType>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [delay, value]);

    return debouncedValue;
};

export default useDebounce;
