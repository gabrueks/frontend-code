const fonts = {
    family: {
        roboto_light: {
            fontFamily: "Roboto",
            fontWeight: 300,
        },
        roboto_light_italic: {
            fontFamily: "Roboto",
            fontWeight: 400,
            fontStyle: "italic",
        },
        roboto_regular: {
            fontFamily: "Roboto",
            fontWeight: 400,
        },
        roboto_medium: {
            fontFamily: "Roboto",
            fontWeight: 500,
        },
        roboto_bold: {
            fontFamily: "Roboto",
            fontWeight: 700,
        },
        roboto_black: {
            fontFamily: "Roboto",
            fontWeight: 900,
        },
        roboto_slab_regular: {
            fontFamily: "Roboto Slab",
            fontWeight: 400,
        },
    },
} as const;

export default fonts;

export type TFonts = typeof fonts;
