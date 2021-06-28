const colors = {
    transparent: "#00000000",
    black: "#000000",
    blackOpacity: "rgba(11, 11, 11, 0.8)",
    dark_blue: "#0951d0",
    dark_blue2: "#125b8c",
    blue: "#1767f5",
    blue2: "#1878b9",
    blue3: "#479ccf",
    blue4: "#528ec1",
    blue5: "#457BDB",
    dark_grey1: "#323232",
    dark_grey2: "#3a3a3a",
    dark_grey3: "#333232",
    grey1: "#606060",
    grey2: "#685858",
    grey3: "#727272",
    grey4: "#535353",
    grey5: "#646363",
    light_grey1: "#cccccc",
    light_grey2: "#dddddd",
    light_grey3: "#ebebeb",
    light_grey4: "#d2d2d2",
    white: "#ffffff",
    white2: "#f6f6f6",
    white_3: "#fff8f8",
    white4: "#fafafa",
    red_1: "#d20",
    red_2: "#651818",
    red_3: "#fff8f8",
    cream: "#f8fff9",
    green: "#1F873D",
    yellow: "#fff3cd",
} as const;

export default colors;

export type TColors = typeof colors;
