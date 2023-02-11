export function getPoundSymbols(times: number = 0): string {
    const isNegative = times < 0;
    if (isNegative || !Number.isInteger(times)) 
        throw new Error('Invalid positive integer');
    const res: string[] = [];
    for (let i = 0; i < times; i++) {
        res.push("#");
    }
    return res.join('');
}

export function runExercise(): string[] {
    const res: string[] = [];
    for (let i = 0; i < 7; i++) {
        const row = getPoundSymbols(i + 1);
        res.push(row);
        console.log(row);
    }
    return res;
}