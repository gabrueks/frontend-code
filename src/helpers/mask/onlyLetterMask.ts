import { ChangeEvent } from "react";

const onlyLetterMask = ({ max = 250, min = 0 } = {}) => <
    T extends ChangeEvent<HTMLInputElement>
>(
    event: T,
): T => {
    event.persist();
    const match = event.target.value.match(/[a-zA-Z\s]/g);
    let newValue = "";
    if (match) {
        newValue = match.slice(min, max).join("");
    }
    event.target.value = newValue;
    return event;
};

export default onlyLetterMask;
