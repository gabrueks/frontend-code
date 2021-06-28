import React, {
    FC,
    ReactElement,
    ChangeEvent,
    ChangeEventHandler,
    useRef,
    useState,
} from "react";

import { SelectTag, OptionTag, TSelectTagProps } from "./styles";

import fonts from "../../theme/fonts";

export type TSelectProps = Omit<TSelectTagProps, "size"> & {
    data?: {
        value: string | number;
        label: string;
    }[];
    initValue?: string | number;
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
    defaultOption?: string;
};

const Select: FC<TSelectProps> = ({
    data = [],
    initValue,
    onChange,
    defaultOption,
    ...style
}): ReactElement => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const [selected, setSelected] = useState(
        initValue ?? (defaultOption ? "default" : data[0]?.value),
    );

    const [isCalculating, setIsCalculating] = useState(true);
    const width = useRef<string | null>(null);

    const measureRef = (node: HTMLSpanElement) => {
        if (node !== null) {
            width.current = `${node.getBoundingClientRect().width + 60}px`;
        }

        setIsCalculating(false);
        return node;
    };

    if (!style.width && isCalculating) {
        const label =
            selected === "default"
                ? defaultOption
                : data.find((item) => item.value === selected)?.label;
        return (
            <span
                ref={measureRef}
                style={{ ...fonts.family.roboto_regular, fontSize: "15px" }}>
                {label}
            </span>
        );
    }

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        if (onChange) onChange(event);
        setSelected(event.target.value);
        setIsCalculating(true);
    };

    return (
        <SelectTag
            style={{ marginBottom: 0 }}
            ref={selectRef}
            width={width.current}
            {...style}
            onChange={handleChange}
            value={selected}>
            {defaultOption && (
                <OptionTag value="default">{defaultOption}</OptionTag>
            )}
            {data.map((opt, idx) => (
                <OptionTag key={idx} value={opt.value}>
                    {opt.label}
                </OptionTag>
            ))}
        </SelectTag>
    );
};

export default Select;
