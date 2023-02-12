export {};
import "jest";
import { getMin } from "./index";

describe('getMin()', () => {
    it('exists', () => {
        expect(getMin).toBeDefined();
    })
    it('returns 1 when called with (1, 2)', () => {
        expect(getMin(1, 2)).toStrictEqual(1);
    })
    it('returns 2 when called with (2, 2)', () => {
        expect(getMin(2, 2)).toStrictEqual(2);
    })
    it('returns -6.9 when called with (4.2, -6.9)', () => {
        expect(getMin(4.2, -6.9)).toStrictEqual(-6.9);
    })
    it('returns -Infinity called with (Infinity, -Infinity)', () => {
        expect(getMin(Infinity, -Infinity)).toStrictEqual(-Infinity);
    })
})