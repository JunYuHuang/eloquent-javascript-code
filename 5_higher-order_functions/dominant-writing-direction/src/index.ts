import { SCRIPTS } from "./scripts";

// types
type ScriptObj = {
    name: string;
    ranges: number[][];
    direction: string;
    year: number;
    living: boolean;
    link: string;
}
type groupObj = {
    name: string,
    count: number,
}

export function dominantDirection(text: string): string {
    if (text === "") return "ltr";
    const directionsAndCount = countBy(Array.from(text), (char: string) => {
        const script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({ name }) => name !== "none");
    if (directionsAndCount.length === 0) return "ltr";
    const resObj = directionsAndCount.reduce((prev, curr) => {
        return prev.count > curr.count ? prev : curr
    });
    return resObj.name;
}

function characterScript(code: number | null | undefined): ScriptObj | null {
    if (code === null || code === undefined) return null;
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

function countBy<T>(items: T[], groupName: (x: T) => string | boolean): groupObj[] {
    let counts: groupObj[] = [];
    for (let item of items) {
        let name: string | boolean = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            counts.push({name: String(name), count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}