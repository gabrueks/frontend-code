export default (str: string): string =>
    str.toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase());
