export {};
import "jest";
import { loop } from "./index";

describe('loop()', () => {
    it('exists', () => {
        expect(loop).toBeDefined();
    })
    it('calls console.log() 3 times with [3,2,1] respectively when called with (3, n => n > 0, n => n - 1, console.log)', () => {
        // loop(3, n => n > 0, n => n - 1, console.log);
        // → 3
        // → 2
        // → 1
        const logSpy = jest.spyOn(console, 'log');
        const val: number = 3;
        loop(val, n => n > 0, n => n - 1, console.log)
        expect(logSpy).toHaveBeenNthCalledWith(1, 3);
        expect(logSpy).toHaveBeenNthCalledWith(2, 2);
        expect(logSpy).toHaveBeenNthCalledWith(3, 1);
    })
})