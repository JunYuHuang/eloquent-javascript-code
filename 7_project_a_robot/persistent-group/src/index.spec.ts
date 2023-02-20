export {};
import "jest";
import { PGroup } from "./index";

let pgroupA: PGroup;
let pgroupAB: PGroup;
let pgroupB: PGroup;

beforeEach(() => {
    pgroupA = PGroup.empty.add("a");
    pgroupAB = pgroupA.add("b");
    pgroupB = pgroupAB.delete("a");
})

describe('PGroup class', () => {
    it('exists', () => {
        expect(PGroup).toBeDefined();
    })
    it('returns a new instance when an element is deleted', () => {
        expect(pgroupB.has("b")).toStrictEqual(true);
    })
    it('is not mutated when an element is added', () => {
        expect(pgroupA.has("b")).toStrictEqual(false);
    })
    it('is not mutated when an element is deleted', () => {
        expect(pgroupB.has("a")).toStrictEqual(false);
    })
    it('returns a new instance when an element is added', () => {
        expect(pgroupAB.has("b")).toStrictEqual(true);
        expect(pgroupAB.has("a")).toStrictEqual(true);
    })
})