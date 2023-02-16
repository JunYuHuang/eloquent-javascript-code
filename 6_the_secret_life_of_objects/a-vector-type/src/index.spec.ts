export {};
import "jest";
import { Vec } from "./index";

describe('Vec class', () => {
    it('exists', () => {
        expect(Vec).toBeDefined();
    })
    it('has a plus() method that returns the sum of 2 vectors', () => {
        const resVec = new Vec(3, 5);
        expect(new Vec(1,2).plus(new Vec(2,3))).toStrictEqual(resVec);
    })
    it('has a minus() method that returns the difference of 2 vectors', () => {
        const resVec = new Vec(-1, -1);
        expect(new Vec(1,2).minus(new Vec(2,3))).toStrictEqual(resVec);
    })
    it('has a length getter property that returns the length of the vector from the origin', () => {
        expect(new Vec(3,4).length).toStrictEqual(5);
    })
})