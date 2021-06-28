import { ChangeEvent } from "react";

const cardMask = <T extends ChangeEvent<HTMLInputElement>>(event: T): T => {
    event.persist();
    const match = event.target.value.match(/\d{1,4}/g);
    let newValue = "";
    if (match) {
        newValue = match.slice(0, 4).join(" ");
    }
    event.target.value = newValue;
    return event;
};

export default cardMask;
