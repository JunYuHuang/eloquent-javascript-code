export function objHasOwnProperty(obj: object, property: any): boolean {
    return Object.prototype.hasOwnProperty.call(obj, property);
}