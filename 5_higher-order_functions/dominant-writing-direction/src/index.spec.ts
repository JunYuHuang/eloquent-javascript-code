export {};
import "jest";
import { dominantDirection } from "./index";

describe('dominantDirection()', () => {
    it('exists', () => {
        expect(dominantDirection).toBeDefined();
    })
    it('returns "ltr" if called with empty string ""', () => {
        expect(dominantDirection("")).toStrictEqual("ltr");
    })
    it('returns "ltr" if called with "Hello"', () => {
        expect(dominantDirection("Hello!")).toStrictEqual("ltr");
    })
    it('returns "rtl" if called with "Hey, مساء الخير"', () => {
        expect(dominantDirection("Hey, مساء الخير")).toStrictEqual("rtl");
    })
    it('returns "ltr" if called with `英国的狗 "woof", 俄罗斯的狗 "тяв"`', () => {
        expect(dominantDirection(`英国的狗 "woof", 俄罗斯的狗 "тяв"`)).toStrictEqual("ltr");
    })
    it('returns "ttb" if called with "ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠪᠤᠷᠢᠶᠠᠳ ᠮᠣᠩᠭᠣᠯ ᠤᠨ ᠦᠨᠡᠨ᠃ amogus"', () => {
        expect(dominantDirection("ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ ᠪᠤᠷᠢᠶᠠᠳ ᠮᠣᠩᠭᠣᠯ ᠤᠨ ᠦᠨᠡᠨ᠃ amogus")).toStrictEqual("ttb");
    })
})