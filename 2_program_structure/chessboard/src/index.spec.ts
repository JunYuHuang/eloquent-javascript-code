export {};
import "jest";

import { getChessboard } from "./index";

describe('getChessboard()', () => {
    it('exists', () => {
        expect(getChessboard).toBeDefined();
    })
    it('returns a string', () => {
        expect(typeof getChessboard()).toStrictEqual('string')
    })
    it('throws an error if called with a float number', () => {
        expect(() => getChessboard(6.9)).toThrow();
    })
    it('throws an error if called with an integer less than 1', () => {
        expect(() => getChessboard(0)).toThrow();
    })
    it('returns an 8x8 grid with newline-char separated rows when called with 8', () => {
        const res = " # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # ";
        console.log(res);
        expect(getChessboard(8)).toStrictEqual(res);
    })
    it('outputs correctly when logging its output when called with 8', () => {
        const spy = jest.spyOn(console, 'log');
        const res = " # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # \n # # # #\n# # # # ";
        console.log(getChessboard(8));
        expect(spy).toHaveBeenCalledWith(res);
    })
    it('returns an 11x11 grid with newline-char separated rows when called with 10', () => {
        const res = " # # # # # \n# # # # # #\n # # # # # \n# # # # # #\n # # # # # \n# # # # # #\n # # # # # \n# # # # # #\n # # # # # \n# # # # # #\n # # # # # ";
        console.log(res);
        expect(getChessboard(11)).toStrictEqual(res);
    })
})