export function flatten(arrOfArrs: any[][]): any[] {
    return arrOfArrs.reduce((prev, curr) => {
        return prev.concat(curr)
    }, []);
}