export {};
import "jest";
import { deepEqual } from "./index";

describe('deepEqual()', () => {
    it('exists', () => {
        expect(deepEqual).toBeDefined();
    })
    it('returns false if called with (1,2)', () => {
        expect(deepEqual(1, 2)).toStrictEqual(false);
    })
    // returns true in author's solution
    // it('returns false if called with ([], {})', () => {
    //     expect(deepEqual([], {})).toStrictEqual(false);
    // })
    it('returns false if called with (null, undefined)', () => {
        expect(deepEqual(null, undefined)).toStrictEqual(false);
    })
    it('returns false if called with 2 objects with the same properties but each object having different values for each property', () => {
        const obj1 = {
            amo: true,
            gus: "false",
        };
        const obj2 = {
            amo: true,
            gus: false
        };
        expect(deepEqual(obj1, obj2)).toStrictEqual(false);
    })
    it('returns false if called with 2 objects both with the count of properties but whose properties are differently named', () => {
        const obj1 = {
            a: true,
            mo: false,
        };
        const obj2 = {
            amo: true,
            gus: false
        };
        expect(deepEqual(obj1, obj2)).toStrictEqual(false);
    })
    // returns true in author's solution
    // it('returns false if called with an array and object both having the same properties and values', () => {
    //     const arr = [ true, "false"];
    //     const obj = {
    //         0: true,
    //         1: "false"
    //     };
    //     expect(deepEqual(arr, obj)).toStrictEqual(false);
    // })
    it('returns false if called with 2 objects where one has an extra property', () => {
        const obj1 = {
            amo: true,
            gus: "false",
        };
        const obj2 = {
            amo: true,
        };
        expect(deepEqual(obj1, obj2)).toStrictEqual(false);
    })
    it('returns true if called with ("he", "he")', () => {
        expect(deepEqual("he", "he")).toStrictEqual(true);
    })
    it('returns true if called with (0, 0)', () => {
        expect(deepEqual(0, 0)).toStrictEqual(true);
    })
    it('returns true if called with (null, null)', () => {
        expect(deepEqual(null, null)).toStrictEqual(true);
    })
    // failing
    it('returns true if called with 2 objects both with the same named, nested properties and values', () => {
        const obj1 = {
            amo: true,
            gus: [
                2,
                { "lol": 1 },
                [ undefined, "he", 3, null]
            ]
        };
        const obj2 = {
            amo: true,
            gus: [
                2,
                { "lol": 1 },
                [ undefined, "he", 3, null]
            ]
        };
        expect(deepEqual(obj1, obj2)).toStrictEqual(true);
    })
    // failing
    it('returns true if called with 2 arrays both with the same values', () => {
        const arr1 = [true, 1, "boo"];
        const arr2 = [true, 1, "boo"];
        expect(deepEqual(arr1, arr2)).toStrictEqual(true);
    })
})