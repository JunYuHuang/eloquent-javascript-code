export { };
import "jest";
import { parse, skipSpace } from "../../programming-language/src";

describe('skipSpace()', () => {
    it('exists', () => {
        expect(skipSpace).toBeDefined();
    })
    it('correctly skips whitespace in single line code when parsing Egg programs', () => {
        const res = { type: "word", name: "x" };
        const eggProgram = "  \n x";
        expect(parse(eggProgram)).toStrictEqual(res);
    })
    it('correctly skips whitespace in multi-line code when parsing Egg programs', () => {
        const res = {
            type: "apply",
            operator: { type: "word", name: "a" },
            args: []
        };
        const eggProgram = "a \n   \n()";
        expect(parse(eggProgram)).toStrictEqual(res);
    })
    it('correctly skips single line comments when parsing Egg programs', () => {
        const res = { type: "word", name: "x" };
        const eggProgram = "# hello\nx";
        expect(parse(eggProgram)).toStrictEqual(res);
    })
    it('correctly skips multi-line comments when parsing Egg programs', () => {
        const res = {
            type: "apply",
            operator: { type: "word", name: "a" },
            args: []
        };
        const eggProgram = "a # one\n   # two\n()";
        expect(parse(eggProgram)).toStrictEqual(res);
    })
})