export {};
import "jest";
import { box, withBoxUnlocked } from "./index";

describe('withBoxUnlocked class', () => {
    it('exists', () => {
        expect(withBoxUnlocked).toBeDefined();
    })
    it('re-locks the box if called with a function argument that returned normally and box was initially locked', () => {
        const myBox = Object.create(box);
        const initiallyLocked = myBox.locked;
        withBoxUnlocked(() => {
            myBox.content.push("gold piece");
        }, myBox);
        expect(initiallyLocked).toStrictEqual(true);
        expect(initiallyLocked).toStrictEqual(myBox.locked);
    })
    it('re-locks the box if called with a function argument that threw an exception and box was initially locked', () => {
        const myBox = Object.create(box);
        const initiallyLocked = myBox.locked;
        try {
            withBoxUnlocked(() => {
                throw new Error("Pirates on the horizon! Abort!");
            }, myBox);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        expect(initiallyLocked).toStrictEqual(true);
        expect(initiallyLocked).toStrictEqual(myBox.locked);
    })
    it('leaves the box unlocked if called with a function argument that returned normally and box was initially unlocked', () => {
        const myBox = Object.create(box);
        myBox.unlock();
        const initiallyLocked = myBox.locked;
        withBoxUnlocked(() => {
            myBox.content.push("gold piece");
        }, myBox);
        expect(initiallyLocked).toStrictEqual(false);
        expect(initiallyLocked).toStrictEqual(myBox.locked);
    })
    it('leaves the box unlocked if called with a function argument that threw an exception and box was initially unlocked', () => {
        const myBox = Object.create(box);
        myBox.unlock();
        const initiallyLocked = myBox.locked;
        try {
            withBoxUnlocked(() => {
                throw new Error("Pirates on the horizon! Abort!");
            }, myBox);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        expect(initiallyLocked).toStrictEqual(false);
        expect(initiallyLocked).toStrictEqual(myBox.locked);
    })
})