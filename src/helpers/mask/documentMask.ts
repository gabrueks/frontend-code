import { ChangeEvent } from "react";

const documentMask = <T extends ChangeEvent<HTMLInputElement>>(event: T): T => {
    event.persist();
    const match = event.target.value.match(/\d/g);
    let newValue = "";
    if (match) {
        const temp = match.join("");
        if (temp.length <= 11) {
            newValue = temp.slice(0, 3);
            if (temp.length > 3) newValue += `.${temp.slice(3, 6)}`;
            if (temp.length > 6) newValue += `.${temp.slice(6, 9)}`;
            if (temp.length > 9) newValue += `-${temp.slice(9, 11)}`;
        } else {
            newValue = temp.slice(0, 2);
            if (temp.length > 2) newValue += `.${temp.slice(2, 5)}`;
            if (temp.length > 5) newValue += `.${temp.slice(5, 8)}`;
            if (temp.length > 8) newValue += `/${temp.slice(8, 12)}`;
            if (temp.length > 12) newValue += `-${temp.slice(12, 14)}`;
        }
    }
    event.target.value = newValue;
    return event;
};

export default documentMask;
