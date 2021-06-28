const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
} as const;

export default breakpoints;

export type TBreakpoints = typeof breakpoints;
