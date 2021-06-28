import { ChangeEvent } from "react";

const onlyDigitsMask = ({ max = 250, min = 0 } = {}) => <
    T extends ChangeEvent<HTMLInputElement>
>(
    event: T,
): T => {
    event.persist();
    const match = event.target.value.match(/\d/g);
    let newValue = "";
    if (match) {
        newValue = match.slice(min, max).join("");
    }
    event.target.value = newValue;
    return event;
};

export default onlyDigitsMask;
