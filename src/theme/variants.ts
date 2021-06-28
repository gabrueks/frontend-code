import colors from "./colors";
import fonts from "./fonts";

const variants = {
    buttons: {
        common: {
            ...fonts.family.roboto_bold,
            alignItems: "center",
            border: "none",
            borderRadius: "7px",
            display: "flex",
            fontSize: "18px",
            height: "45px",
            minWidth: "max-content",
            outline: "none",
            padding: "0 15px",
        },
        primary: {
            backgroundColor: colors.blue,
            color: colors.white2,
        },
        secondary: {
            backgroundColor: colors.dark_blue,
            color: colors.blue,
        },
        noBackground: {
            backgroundColor: colors.transparent,
            color: colors.blue,
        },
        disabled: {
            backgroundColor: colors.grey1,
            color: colors.white,
        },
    },
} as const;

export default variants;

export type TVariants = typeof variants;
