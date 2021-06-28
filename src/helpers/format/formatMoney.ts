export default function formatMoney(
    value?: number | string,
    currency = true,
): string {
    if (value) {
        const temp = typeof value === "string" ? parseFloat(value) : value;
        return `${currency ? "R$" : ""} ${temp.toFixed(2).replace(".", ",")}`;
    }
    return "";
}
