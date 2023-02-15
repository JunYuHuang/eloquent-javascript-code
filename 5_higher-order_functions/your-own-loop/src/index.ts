export function loop<T>(value: T, test: (x: T) => boolean, update: (x: T) => T, body: (x: T) => any): void {
    for (let i = value; test(i); i = update(i)) {
        body(i);
    }
}