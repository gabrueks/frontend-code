import { DefaultTheme } from "styled-components";

import breakpoints, { TBreakpoints } from "./breakpoints";
import colors, { TColors } from "./colors";
import fonts, { TFonts } from "./fonts";
import variants, { TVariants } from "./variants";

declare module "styled-components" {
    export interface DefaultTheme {
        breakpoints: TBreakpoints;
        colors: TColors;
        fonts: TFonts;
        variants: TVariants;
    }
}

const theme: DefaultTheme = {
    breakpoints,
    colors,
    fonts,
    variants,
};

export default theme;

export type TTheme = typeof theme;
