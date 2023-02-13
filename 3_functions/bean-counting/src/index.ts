export function countBs(str: string): number {
    return countChar(str, "B");
}

export function countChar(str: string, targetChar: string): number {
    let count: number = 0;
    for (const char of str) {
        if (char === targetChar) count++;
    }
    return count;
}