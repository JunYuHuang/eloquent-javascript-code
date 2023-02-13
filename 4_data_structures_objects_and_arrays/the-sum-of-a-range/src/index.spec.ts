export {};
import "jest";
import { range, sum } from "./index";

describe('range()', () => {
    it('exists', () => {
        expect(range).toBeDefined();
    })
    it('returns correctly when called with (1, 10)', () => {
        const res = [1,2,3,4,5,6,7,8,9,10];
        expect(range(1, 10)).toStrictEqual(res);
    })
    it('returns [0] when called with (0, 0)', () => {
        expect(range(0, 0)).toStrictEqual([0]);
    })
    it('returns correctly when called with (-3, 2)', () => {
        const res = [-3, -2, -1, 0, 1, 2];
        expect(range(-3, 2)).toStrictEqual(res);
    })
    it('throws an error if called with (2, 1)', () => {
        expect(() => range(2, 1)).toThrow();
    })
    it('throws an error if called with (-5, -10)', () => {
        expect(() => range(-5, -10)).toThrow();
    })
    it('throws an error if called with a step of 0', () => {
        expect(() => range(0, 1, 0)).toThrow();
    })
    it('returns correctly when called with (1, 10, 2)', () => {
        const res = [1, 3, 5, 7, 9];
        expect(range(1, 10, 2)).toStrictEqual(res);
    })
    it('returns correctly when called with (5, 2, -1)', () => {
        const res = [5, 4, 3, 2];
        expect(range(5, 2, -1)).toStrictEqual(res);
    })
})

describe('sum()', () => {
    it('exists', () => {
        expect(sum).toBeDefined();
    })
    it('returns 55 when called with an array of numbers from 1 to 10 inclusive', () => {
        const arr = [1,2,3,4,5,6,7,8,9,10];
        expect(sum(arr)).toStrictEqual(55);
    })
})

describe('range() and sum()', () => {
    it('returns 55 when sum(range(1, 10)) called', () => {
        expect(sum(range(1, 10))).toStrictEqual(55);
    })
})