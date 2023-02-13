export {};
import "jest";
import { reverseArray, reverseArrayInPlace } from "./index";

describe('reverseArray()', () => {
    it('exists', () => {
        expect(reverseArray).toBeDefined();
    })
    it('returns correctly when called with odd-lengthed arrays', () => {
        const res = [2,1,0];
        expect(reverseArray([0,1,2])).toStrictEqual(res);
    })
    it('returns correctly when called with even-lengthed arrays', () => {
        const res = [3,2,1,0];
        expect(reverseArray([0,1,2,3])).toStrictEqual(res);
    })
    it('returns a new array when called', () => {
        const res: Array<string> = [];
        expect(Object.is(reverseArray(res), res)).toBe(false);
    })
})

describe('reverseArrayInPlace()', () => {
    it('exists', () => {
        expect(reverseArrayInPlace).toBeDefined();
    })
    it('returns correctly when called with odd-lengthed arrays', () => {
        const res = [2,1,0];
        expect(reverseArrayInPlace([0,1,2])).toStrictEqual(res);
    })
    it('returns correctly when called with even-lengthed arrays', () => {
        const res = [3,2,1,0];
        expect(reverseArrayInPlace([0,1,2,3])).toStrictEqual(res);
    })
    it('returns the same array when called', () => {
        const res: Array<number> = [];
        expect(Object.is(reverseArrayInPlace(res), res)).toBe(true);
    })
})