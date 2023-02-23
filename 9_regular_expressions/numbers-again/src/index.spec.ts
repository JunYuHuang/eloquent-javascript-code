export { };
import "jest";
import { JSNumberRegex } from "./index";

describe('JSNumberRegex regex', () => {
    it('exists', () => {
        expect(JSNumberRegex).toBeDefined();
    })
    it('should match certain valid JavaScript number strings', () => {
        const strings = ["1", "-1", "+15", "1.55", ".5", "5.",
            "1.3e2", "1E-4", "1e+12"];
        for (const s of strings) {
            const res = JSNumberRegex.test(s);
            console.log(`${res ? "✅" : "❌"} should match ${s}`)
            expect(res).toStrictEqual(true);
        }
    })
    it('should not match certain invalid JavaScript number strings', () => {
        const strings = ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
            ".5.", "1f5", "."];
        for (const s of strings) {
            const res = JSNumberRegex.test(s);
            console.log(`${res === false ? "✅" : "❌"} should not match ${s}`);
            expect(res).toStrictEqual(false);
        }
    })
})