import { ChangeEvent } from "react";

const dateMask = (separator?: string) => <
    T extends ChangeEvent<HTMLInputElement>
>(
    event: T,
): T => {
    event.persist();
    const match = event.target.value.match(/\d/g);
    let newValue = "";
    if (match) {
        const temp = match.join("");
        newValue = temp.slice(0, 2);
        if (temp.length > 2)
            newValue += `${separator ?? "/"}${temp.slice(2, 6)}`;
    }
    event.target.value = newValue;
    return event;
};

export default dateMask;
