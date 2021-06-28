import { MutableRefObject, useEffect, useRef } from "react";

export default function useUpToDataRef<T>(value: T): MutableRefObject<T> {
    const valueRef = useRef(value);
    useEffect(() => {
        valueRef.current = value;
    }, [value]);
    return valueRef;
}
