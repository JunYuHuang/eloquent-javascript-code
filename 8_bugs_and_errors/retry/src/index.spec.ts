export {};
import "jest";
import { reliableMultiply } from "./index";

describe('reliableMultiply()', () => {
    it('exists', () => {
        expect(reliableMultiply).toBeDefined();
    })
    it('always returns a valid result if called with valid numbers', () => {
        expect(reliableMultiply(8, 8)).toStrictEqual(64);
    })
})