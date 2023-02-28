export { };
import "jest";
import { parse, evaluate, topScope, run } from "./index";

describe('parse()', () => {
    it('exists', () => {
        expect(parse).toBeDefined();
    })
    it('should return an expression of object when called with an Egg expression', () => {
        const res = {
            type: "apply",
            operator: { type: "word", name: "+" },
            args: [
                { type: "word", name: "a" },
                { type: "value", value: 10 }
            ]
        }
        expect(parse("+(a, 10)")).toStrictEqual(res);
    })
})

describe('evaluate()', () => {
    it('exists', () => {
        expect(evaluate).toBeDefined();
    })
    it('should correctly evaluate if constructs', () => {
        const eggExprParsed = parse(`if(true, false, true)`);
        expect(evaluate(eggExprParsed, topScope)).toStrictEqual(false);
    })
})

describe('run()', () => {
    it('exists', () => {
        expect(run).toBeDefined();
    })
    it('should correctly interpret and run a given Egg program in a new scope', () => {
        const eggProgram = `do(define(total, 0),
                                define(count, 1),
                                while(<(count, 11),
                                    do(define(total, +(total, count)),
                                        define(count, +(count, 1)))),
                                print(total))`;
        expect(run(eggProgram)).toStrictEqual(55);
    })
    it('should be able to run user-defined functions', () => {
        const eggProgramPlusOne = `do(define(plusOne, fun(a, +(a, 1))),
                                        print(plusOne(10)))`;
        expect(run(eggProgramPlusOne)).toStrictEqual(11);

        const eggProgramPow = `do(define(pow, fun(base, exp,
                                    if(==(exp, 0),
                                        1,
                                        * (base, pow(base, -(exp, 1)))))),
                                    print(pow(2, 10)))`;
        expect(run(eggProgramPow)).toStrictEqual(1024);
    })
})