export {};
import "jest";
import { everyWithLoop, everyWithSome } from "./index";

describe('everyWithLoop()', () => {
    it('exists', () => {
        expect(everyWithLoop).toBeDefined();
    })
    it('returns true if called with ([1,3,5], n => n < 10)', () => {
        expect(everyWithLoop([1,3,5], n => n < 10)).toStrictEqual(true);
    })
    it('returns false if called with ([2,4,16], n => n < 10)', () => {
        expect(everyWithLoop([2,4,16], n => n < 10)).toStrictEqual(false);
    })
    it('returns true if called with ([], n => n < 10)', () => {
        expect(everyWithLoop([], n => n < 10)).toStrictEqual(true);
    })
})

describe('everyWithSome()', () => {
    it('exists', () => {
        expect(everyWithSome).toBeDefined();
    })
    it('returns true if called with ([1,3,5], n => n < 10)', () => {
        expect(everyWithSome([1,3,5], n => n < 10)).toStrictEqual(true);
    })
    it('returns false if called with ([2,4,16], n => n < 10)', () => {
        expect(everyWithSome([2,4,16], n => n < 10)).toStrictEqual(false);
    })
    it('returns true if called with ([], n => n < 10)', () => {
        expect(everyWithSome([], n => n < 10)).toStrictEqual(true);
    })
})