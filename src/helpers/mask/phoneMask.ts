import { ChangeEvent } from "react";

export default function phoneMask(str: string, countryCode = "55"): string {
    const match = str.match(/[+]?\d/g);
    let newValue = "";
    if (match) {
        let temp = match.join("");
        if (temp.slice(0, countryCode.length + 1) === `+${countryCode}`)
            temp = temp.slice(countryCode.length + 1);
        if (temp.length > 0) newValue = `+${countryCode} ${temp.slice(0, 2)}`;
        if (temp.length > 2) newValue += ` ${temp.slice(2, 7)}`;
        if (temp.length > 7) newValue += `-${temp.slice(7, 11)}`;
    }
    return newValue;
}

export function phoneMaskEventHandler<T extends ChangeEvent<HTMLInputElement>>(
    event: T,
): T {
    event.persist();
    event.target.value = phoneMask(event.target.value);
    return event;
}
