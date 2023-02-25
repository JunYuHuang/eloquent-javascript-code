export { };
import "jest";
import { Promise_all } from "./index";

function soon(val: any) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500);
    });
}

describe('Promise_all()', () => {
    it('exists', () => {
        expect(Promise_all).toBeDefined();
    })
    it('should resolve if called with an empty array', async () => {
        const res = await Promise_all([]);
        expect(res).toStrictEqual([]);
    })
    it('should resolve if called with an array of promises that will all resolve', async () => {
        const res = await Promise_all([soon(1), soon(2), soon(3)]);
        expect(res).toStrictEqual([1, 2, 3]);
    })
    it('should reject if called with an array of promises where one promise will reject', () => {
        expect.assertions(1);
        Promise_all([soon(1), Promise.reject("X"), soon(3)])
            .then(res => {
                console.log("Should not get here");
            }).catch(err => {
                expect(err).toStrictEqual("X");
            })
    })
})