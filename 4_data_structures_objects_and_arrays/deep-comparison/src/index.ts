export function deepEqual(x: any, y: any): boolean {
    if (x === y && Object.is(x, y)) return true;
    if (!isObject(x) || !isObject(y)) return false;
    // if ((isObject(x) && isArray(y)) ||
    //     (isArray(x) && isObject(y))) return false;
    const xKeys = Object.keys(x), yKeys = Object.keys(y);
    if (xKeys.length !== yKeys.length) return false;
    for (let key of xKeys) {
        if (!yKeys.includes(key) || !deepEqual(x[key], y[key])) return false;
    }
    return true;
}

function isObject(obj: any): boolean {
    return obj != null && typeof obj === 'object';
}

// function isArray(arr: any): boolean {
//     return arr != null && typeof arr === 'object' && arr.hasOwnProperty('length');
// }