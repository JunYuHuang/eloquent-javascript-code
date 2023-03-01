export { };
import "jest";
import { run, specialForms } from "../../programming-language/src";

describe('specialForms.set()', () => {
    it('exists', () => {
        expect(specialForms.set).toBeDefined();
    })
    it('should overwrite a binding with a new value if called on an existing binding', () => {
        const eggProgram = `do(define(x, 4),
                            define(setx, fun(val, set(x, val))),
                            setx(50),
                            print(x))`;
        expect(run(eggProgram)).toStrictEqual(50);
    })
    it('should throw a ReferenceError if called on a non-existent binding', () => {
        const eggProgram = `set(quux, true)`;
        expect(() => run(eggProgram)).toThrow(ReferenceError);
    })
})