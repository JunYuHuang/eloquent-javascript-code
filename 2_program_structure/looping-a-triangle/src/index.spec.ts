export {};
import "jest";

import { getPoundSymbols, runExercise } from "./index";

describe('getPoundSymbols()', () => {
    it('exists', () => {
        expect(getPoundSymbols).toBeDefined();
    })
    it('returns a string', () => {
        const res = getPoundSymbols();
        expect(typeof res).toStrictEqual('string');
    })
    it('returns "#" when called with 1', () => {
        expect(getPoundSymbols(1)).toStrictEqual('#');
    });
    it('throws an error when called with -1', () => {
        expect(() => getPoundSymbols(-1)).toThrow();
    })
    it('throws an error when called with 2.5', () => {
        expect(() => getPoundSymbols(2.5)).toThrow();
    })
    it('returns "###" when called with 3', () => {
        expect(getPoundSymbols(3)).toStrictEqual('###');
    })
})

describe('runExercise()', () => {
    it('makes 7 calls to console.log', () => {
        const spy = jest.spyOn(console, 'log');
        runExercise();
        expect(spy).toHaveBeenCalledTimes(7);
    });
    it('returns an array of strings resembling a 90 degree triangle of pound characters', () => {
        const res = [
            '#',
            '##',
            '###',
            '####',
            '#####',
            '######',
            '#######',
        ];
        expect(runExercise()).toStrictEqual(res);
    })
})