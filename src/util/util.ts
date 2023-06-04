export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cleanArray<T>(data: (T | null)[]) {
    return data.filter((value): value is T => value !== null);
}

export function cleanObject<T extends object>(data: T) {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null)) as Partial<T>;
}