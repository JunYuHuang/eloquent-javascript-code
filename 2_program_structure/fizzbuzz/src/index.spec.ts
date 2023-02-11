export {};
import "jest";

import { fizzBuzz, printFizzBuzz } from "./index";

describe('fizzBuzz()', () => {
    it('exists', () => {
        expect(fizzBuzz).toBeDefined();
    })
    it('returns "Fizz" if called with 3', () => {
        expect(fizzBuzz(3)).toStrictEqual("Fizz");
    })
    it('returns "Buzz" if called with 5', () => {
        expect(fizzBuzz(5)).toStrictEqual("Buzz");
    })
    it('returns "FizzBuzz" if called with 15', () => {
        expect(fizzBuzz(15)).toStrictEqual("FizzBuzz");
    })
    it('returns "1" if called with 1', () => {
        expect(fizzBuzz(1)).toStrictEqual("1");
    })
    it('returns "Fizz" if called with 12', () => {
        expect(fizzBuzz(12)).toStrictEqual("Fizz");
    })
    it('returns "Buzz" if called with 80', () => {
        expect(fizzBuzz(80)).toStrictEqual("Buzz");
    })
    it('returns "FizzBuzz" if called with 60', () => {
        expect(fizzBuzz(60)).toStrictEqual("FizzBuzz");
    })
    it('returns "Buzz" if called with 100', () => {
        expect(fizzBuzz(100)).toStrictEqual("Buzz");
    })
    it('returns "44" if called with 44', () => {
        expect(fizzBuzz(44)).toStrictEqual("44");
    })
})

describe('printFizzBuzz()', () => {
    it('exists', () => {
        expect(printFizzBuzz).toBeDefined();
    })
    it('calls console.log() 100 times', () => {
        const spy = jest.spyOn(console, 'log');
        printFizzBuzz();
        expect(spy).toHaveBeenCalledTimes(100);
    });
    it('calls console.log("1") on the first call', () => {
        const spy = jest.spyOn(console, 'log');
        printFizzBuzz();
        expect(spy).toHaveBeenNthCalledWith(1, '1')
    })
    it('calls console.log("Buzz") on the 100th call', () => {
        const spy = jest.spyOn(console, 'log');
        printFizzBuzz();
        expect(spy).toHaveBeenNthCalledWith(100, 'Buzz');
    })
})