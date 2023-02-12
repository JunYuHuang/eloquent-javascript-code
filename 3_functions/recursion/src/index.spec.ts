export {};
import "jest";
import { isEven } from "./index";

describe('isEven()', () => {
    it('exists', () => {
        expect(isEven).toBeDefined();
    })
    it('returns true if called with 0', () => {
        expect(isEven(0)).toBe(true);
    })
    it('returns false if called with 1', () => {
        expect(isEven(1)).toBe(false);
    })
    it('returns true if called with 50', () => {
        expect(isEven(50)).toBe(true);
    })
    it('returns false if called with 75', () => {
        expect(isEven(75)).toBe(false);
    })
    it('returns false if called with -1', () => {
        expect(isEven(-1)).toBe(false);
    })
    it('returns true if called with -42', () => {
        expect(isEven(-42)).toBe(true);
    })
})