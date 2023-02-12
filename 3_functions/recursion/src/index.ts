export function isEven(n: number, memo: Map<number, boolean | undefined> = new Map()): boolean | undefined {
    n = n < 0 ? -1 * n : n;
    if (memo.has(n)) return memo.get(n);
    if (n === 0) return true;
    if (n === 1) return false;
    memo.set(n, isEven(n - 2, memo));
    return memo.get(n);
}