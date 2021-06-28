export function validateCPF(value: string): boolean {
    if (value.replace(/[.\-/\s]/g, "").length !== 11) return false;

    const original = value
        .replace(/[.\-/\s]/g, "")
        .split("")
        .map((num) => parseInt(num, 10));
    if (original.every((num) => num === original[0])) return false;
    if (
        original.every((num, idx) => {
            return idx === 0 || num === (original[idx - 1] + 1) % 10;
        })
    )
        return false;

    let temp =
        11 -
        (original
            .slice(0, 9)
            .reduce((total, num, idx) => total + num * (10 - idx), 0) %
            11);
    if ((temp > 9 ? 0 : temp) !== original[9]) return false;

    temp =
        11 -
        (original
            .slice(0, 10)
            .reduce((total, num, idx) => total + num * (11 - idx), 0) %
            11);
    if ((temp > 9 ? 0 : temp) !== original[10]) return false;

    return true;
}

export function validateCNPJ(value: string): boolean {
    if (value.replace(/[.\-/\s]/g, "").length !== 14) return false;

    const original = value
        .replace(/[.\-/\s]/g, "")
        .split("")
        .map((num) => parseInt(num, 10));
    let slice = original.slice(0, -2);
    const firstSequence = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondSequence = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let temp =
        slice.reduce((total, num, idx) => total + num * firstSequence[idx], 0) %
        11;
    temp = temp < 2 ? 0 : 11 - temp;

    if (temp !== original[original.length - 2]) return false;

    slice = [...original.slice(0, -2), temp];
    temp =
        slice.reduce(
            (total, num, idx) => total + num * secondSequence[idx],
            0,
        ) % 11;
    temp = temp < 2 ? 0 : 11 - temp;

    if (temp !== original[original.length - 1]) return false;

    return true;
}
