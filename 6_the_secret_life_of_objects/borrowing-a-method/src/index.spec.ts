export {};
import "jest";
import { objHasOwnProperty } from "./index";

describe('objHasOwnProperty()', () => {
    it('exists', () => {
        expect(objHasOwnProperty).toBeDefined();
    })
    it('returns true if called with a value on an object that has that value', () => {
        const map = { one: true, two: true, hasOwnProperty: true };
        expect(objHasOwnProperty(map, "one")).toStrictEqual(true);
    })
    it('returns true if called with a value on an object that has that value', () => {
        const map = { one: true, two: true, hasOwnProperty: true };
        expect(objHasOwnProperty(map, "hasOwnProperty")).toStrictEqual(true);
    })
    it('returns false if called with a value on an object that does not have that value', () => {
        const map = { one: true, two: true, hasOwnProperty: true };
        expect(objHasOwnProperty(map, "three")).toStrictEqual(false);
    })
    it('returns false if called with a value on an object that does not have that value', () => {
        const map = { one: true, two: true };
        expect(objHasOwnProperty(map, "hasOwnProperty")).toStrictEqual(false);
    })
})