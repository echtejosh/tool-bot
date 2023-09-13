export function stringify(input: string | number | boolean) {
    return String(input);
}

export function delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}