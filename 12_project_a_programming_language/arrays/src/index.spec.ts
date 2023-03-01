export { };
import "jest";
import { run, topScope } from "../../programming-language/src/index";

describe('array support', () => {
    it('exists', () => {
        const { array, length, element } = topScope;
        expect(array).toBeDefined();
        expect(length).toBeDefined();
        expect(element).toBeDefined();
    })
    it('works', () => {
        const eggProgram = `
            do(define(sum, fun(array,
                do(define(i, 0),
                define(sum, 0),
                while(<(i, length(array)),
                    do(define(sum, +(sum, element(array, i))),
                        define(i, +(i, 1)))),
                sum))),
            print(sum(array(1, 2, 3))))`;
        expect(run(eggProgram)).toStrictEqual(6);
    })
})