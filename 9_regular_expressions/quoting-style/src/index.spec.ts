export { };
import "jest";
import { singleToDoubleQuotes } from "./index";

describe('singleToDoubleQuotes class', () => {
    it('exists', () => {
        expect(singleToDoubleQuotes).toBeDefined();
    })
    it('replaces all single quote pairs with double quote pairs if called with a text string', () => {
        const text = "'I'm the cook,' he said, 'it's my job.'";
        const res = `"I'm the cook," he said, "it's my job."`;
        expect(singleToDoubleQuotes(text)).toStrictEqual(res);
    })
})