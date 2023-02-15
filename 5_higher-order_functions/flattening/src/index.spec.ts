export {};
import "jest";
import { flatten } from "./index";

describe('flatten()', () => {
    it('exists', () => {
        expect(flatten).toBeDefined();
    })
    it('returns a 1D array from a matrix', () => {
        expect(flatten([[1, 2, 3], [4, 5], [6]])).toStrictEqual([1,2,3,4,5,6]);
    })
})