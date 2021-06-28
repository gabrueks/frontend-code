import { ChangeEvent } from "react";

export default function cepMask(str: string): string {
    const match = str.match(/\d/g);
    let newValue = "";
    if (match) {
        const temp = match.join("");
        newValue = temp.slice(0, 5);
        if (temp.length > 5) newValue += `-${temp.slice(5, 8)}`;
    }
    return newValue;
}

export function cepMaskEventHandler<T extends ChangeEvent<HTMLInputElement>>(
    event: T,
): T {
    event.persist();
    event.target.value = cepMask(event.target.value);
    return event;
}
