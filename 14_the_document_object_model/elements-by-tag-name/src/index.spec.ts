export { };
import "jest";
import { byTagName } from "./index";

describe('byTagName()', () => {
    it('exists', () => {
        expect(byTagName).toBeDefined();
    })
    it('works', () => {
        document.body.innerHTML = `
            <!doctype html>
            <h1>Heading with a <span>span</span> element.</h1>
            <p>A paragraph with <span>one</span>, <span>two</span>
            spans.</p>
        `;
        expect(byTagName(document.body, "h1").length).toStrictEqual(1);
        expect(byTagName(document.body, "span").length).toStrictEqual(3);
        let para = document.querySelector("p")!;
        expect(byTagName(para, "span").length).toStrictEqual(2);
    })
})