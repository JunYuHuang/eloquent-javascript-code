export function everyWithLoop<T>(array: T[], predicate: (x: T) => boolean): boolean {
    for (let el of array) {
        if (!predicate(el)) return false;
    }
    return true;
}

export function everyWithSome<T>(array: T[], predicate: (x: T) => boolean): boolean {
    return !array.some((el) => !predicate(el));
}