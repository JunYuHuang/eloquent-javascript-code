export function getChessboard(size: number = 8): string {
    if (!Number.isInteger(size) || size < 1) 
        throw Error("Invalid positive, non-zero integer size");
    function isEven(n: number): boolean { 
        return n % 2 == 0 
    }
    const res: string[] = [];
    for (let row = 0; row < size; row++) {
        let firstChar: string = isEven(row) ? " " : "#"
        let temp: string[] = [firstChar];
        for (let col = 1; col < size; col++) {
            temp.push(temp[col - 1] === "#" ? " " : "#");
        }
        if (row !== size - 1) {
            temp.push("\n");
        }
        res.push(temp.join(""));
    }
    return res.join("");
}