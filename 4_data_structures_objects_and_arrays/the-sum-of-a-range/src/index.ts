export function range(start: number, end: number, step: number = 1): number[] {
    if (step === 0) throw Error("Cannot have a step of 0!");
    if (start === end) return [start];
    const isInvalidIncreasingRange = start < end && step <= 0;
    const isInvalidDecreasingRange = start > end && step >= 0;
    if (isInvalidIncreasingRange || isInvalidDecreasingRange) throw Error("Invalid range!");
    const res: number[] = [];
    for (let i = start; start < end ? i < end + 1 : i >= end; i += step) {
        res.push(i);
    }
    return res;
}

export function sum(nums: number[]): number {
    let res: number = 0;
    for (let n of nums) {
        res += n;
    }
    return res;
}