export {};
import "jest";
import { countBs, countChar } from "./index";

describe('countBs()', () => {
    it('exists', () => {
        expect(countBs).toBeDefined();
    })
    it('returns 3 if called with "BigBlueBalls"', () => {
        expect(countBs("BigBlueBalls")).toStrictEqual(3);
    })
    it('returns 0 if called with "bmogus123!"', () => {
        expect(countBs("bmogus123!")).toStrictEqual(0);
    })
})

describe('countChars()', () => {
    it('exists', () => {
        expect(countChar).toBeDefined();
    })
    it('returns 2 if called with "snake_case_example"', () => {
        expect(countChar("snake_case_example", "_")).toStrictEqual(2);
    })
    it('returns 2 if called with "smallblueballs"', () => {
        expect(countChar("smallblueballs", "b")).toStrictEqual(2);
    })
})