type Any =
    | BigInt
    | boolean
    | number
    | string
    | symbol
    | undefined
    | null
    | Record<string | number | symbol, any>
    | any[]
    | ((...args: any[]) => any);

export default function deepEqual(a: Any, b: Any): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
        return (
            a.length === b.length &&
            a.every((item, idx) => deepEqual(item, b[idx]))
        );
    }

    if (
        typeof a === "object" &&
        a !== null &&
        typeof b === "object" &&
        b !== null
    ) {
        const tempA = a as Record<string | number | symbol, any>;
        const tempB = b as Record<string | number | symbol, any>;

        if (Object.keys(tempA).length !== Object.keys(tempB).length) {
            return false;
        }

        let equal = true;
        let key: string | number | symbol;
        for (key in tempA) {
            if (!deepEqual(tempB[key], tempA[key])) equal = false;
        }
        return equal;
    }

    if (typeof a === "function" && typeof b === "function") {
        return a.toString() === b.toString();
    }

    return a === b;
}
