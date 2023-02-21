class MultiplicatorUnitFailure extends Error {};

function primitiveMultiply(a: number, b: number): number {
    if (Math.random() < 0.2) return a * b;
    throw new MultiplicatorUnitFailure("Klunk");
}

export function reliableMultiply(a: number, b: number): number {
    let res: number;
    while (true) {
        try {
            res = primitiveMultiply(a, b);
            break;
        } catch (error: any) {
            if (error instanceof MultiplicatorUnitFailure) throw new Error();
        }
    }
    return res;
}