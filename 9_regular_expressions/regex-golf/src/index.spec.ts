export { };
import "jest";
import { regexGolf } from "./index";

describe('regexGolf object', () => {
    it('exists', () => {
        expect(regexGolf).toBeDefined();
    })
})

describe('regexGolf[1] regex', () => {
    it('exists', () => {
        expect(regexGolf[1]).toBeDefined();
    })
    it('matches "cat"', () => {
        expect(regexGolf[1].test("cat")).toStrictEqual(true);
    })
    it('matches "car"', () => {
        expect(regexGolf[1].test("cat")).toStrictEqual(true);
    })
    it('matches "my car"', () => {
        expect(regexGolf[1].test("my car")).toStrictEqual(true);
    })
    it('matches "bad cats"', () => {
        expect(regexGolf[1].test("bad cats")).toStrictEqual(true);
    })
    it('does not matches "camper"', () => {
        expect(regexGolf[1].test("camper")).toStrictEqual(false);
    })
    it('does not matches "high art"', () => {
        expect(regexGolf[1].test("high art")).toStrictEqual(false);
    })
})

describe('regexGolf[2] regex', () => {
    it('exists', () => {
        expect(regexGolf[2]).toBeDefined();
    })
    it('matches "pop"', () => {
        expect(regexGolf[2].test("pop")).toStrictEqual(true);
    })
    it('matches "prop"', () => {
        expect(regexGolf[2].test("prop")).toStrictEqual(true);
    })
    it('matches "pop culture"', () => {
        expect(regexGolf[2].test("pop culture")).toStrictEqual(true);
    })
    it('matches "mad props"', () => {
        expect(regexGolf[2].test("mad props")).toStrictEqual(true);
    })
    it('does not matches "plop"', () => {
        expect(regexGolf[2].test("plop")).toStrictEqual(false);
    })
    it('does not matches "prrrop"', () => {
        expect(regexGolf[2].test("prrrop")).toStrictEqual(false);
    })
})

describe('regexGolf[3] regex', () => {
    it('exists', () => {
        expect(regexGolf[3]).toBeDefined();
    })
    it('matches "ferret"', () => {
        expect(regexGolf[3].test("ferret")).toStrictEqual(true);
    })
    it('matches "ferry"', () => {
        expect(regexGolf[3].test("ferry")).toStrictEqual(true);
    })
    it('matches "ferrari"', () => {
        expect(regexGolf[3].test("ferrari")).toStrictEqual(true);
    })
    it('does not matches "ferrum"', () => {
        expect(regexGolf[3].test("ferrum")).toStrictEqual(false);
    })
    it('does not matches "transfer A"', () => {
        expect(regexGolf[3].test("transfer A")).toStrictEqual(false);
    })
})

describe('regexGolf[4] regex', () => {
    it('exists', () => {
        expect(regexGolf[4]).toBeDefined();
    })
    it('matches "pious"', () => {
        expect(regexGolf[4].test("pious")).toStrictEqual(true);
    })
    it('matches "how delicious"', () => {
        expect(regexGolf[4].test("how delicious")).toStrictEqual(true);
    })
    it('matches "spacious room"', () => {
        expect(regexGolf[4].test("spacious room")).toStrictEqual(true);
    })
    it('does not matches "ruinous"', () => {
        expect(regexGolf[4].test("ruinous")).toStrictEqual(false);
    })
    it('does not matches "consciousness"', () => {
        expect(regexGolf[4].test("consciousness")).toStrictEqual(false);
    })
    it('does not matches "ious"', () => {
        expect(regexGolf[4].test("ious")).toStrictEqual(false);
    })
})

describe('regexGolf[5] regex', () => {
    it('exists', () => {
        expect(regexGolf[5]).toBeDefined();
    })
    it('matches "bad punctuation ."', () => {
        expect(regexGolf[5].test("bad punctuation .")).toStrictEqual(true);
    })
    it('matches "bad punctuation ,"', () => {
        expect(regexGolf[5].test("bad punctuation ,")).toStrictEqual(true);
    })
    it('matches "bad punctuation ;"', () => {
        expect(regexGolf[5].test("bad punctuation ;")).toStrictEqual(true);
    })
    it('does not matches "escape the period"', () => {
        expect(regexGolf[5].test("escape the period")).toStrictEqual(false);
    })
})

describe('regexGolf[7] regex', () => {
    it('exists', () => {
        expect(regexGolf[7]).toBeDefined();
    })
    it('matches "red platypus"', () => {
        expect(regexGolf[7].test("red platypus")).toStrictEqual(true);
    })
    it('matches "wobbling nest"', () => {
        expect(regexGolf[7].test("wobbling nest")).toStrictEqual(true);
    })
    it('does not matches "earth bed"', () => {
        expect(regexGolf[7].test("earth bed")).toStrictEqual(false);
    })
    it('does not matches "learning ape"', () => {
        expect(regexGolf[7].test("learning ape")).toStrictEqual(false);
    })
    it('does not matches "BEET"', () => {
        expect(regexGolf[7].test("BEET")).toStrictEqual(false);
    })
})