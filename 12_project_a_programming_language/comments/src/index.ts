// see modified Egg programming project
export function skipSpace(string: string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}