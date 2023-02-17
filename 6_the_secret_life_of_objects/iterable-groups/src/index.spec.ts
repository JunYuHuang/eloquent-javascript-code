export {};
import "jest";
import { Group, GroupIterator } from "./index";

describe('Group class', () => {
    it('exists', () => {
        expect(Group).toBeDefined();
    })
    it('creates a group when its from() static method is called with an iterable object', () => {
        const group = Group.from([10, 20]);
        expect(group.size).toStrictEqual(2);
    })
    it('returns true if its has() method is called with a value that is in a group', () => {
        const group = Group.from([10, 20]);
        expect(group.has(10)).toStrictEqual(true);
    })
    it('returns false if its has() method is called with a value that is not in a group', () => {
        const group = Group.from([10, 20]);
        expect(group.has(30)).toStrictEqual(false);
    })
    it('adds a new value to a group if its add() method is called with a value that is in the group', () => {
        const group = Group.from(["a", "b", "c"]);
        group.add("d");
        expect(group.size).toStrictEqual(4);
    })
    it('does nothing if its add() method is called with a value that is in a group', () => {
        const group = Group.from(["a", "b", "c"]);
        group.add("c");
        expect(group.size).toStrictEqual(3);
    })
    it('deletes a value from a group if its delete() method is called with a value that is in the group', () => {
        const group = Group.from(["a", "b", "c"]);
        group.delete("c");
        expect(group.size).toStrictEqual(2); 
    })
    it('does nothing if its delete() method is called with a value that is not in a group', () => {
        const group = Group.from(["a", "b", "c"]);
        group.delete("d");
        expect(group.size).toStrictEqual(3); 
    })
    it('whose instances can be iterated thru using a "for-of" loop', () => {
        const logSpy = jest.spyOn(console, 'log'); 
        const group = Group.from(["a", "b", "c"]);
        for (let el of group) console.log(el);
        expect(logSpy).toHaveBeenNthCalledWith(1, "a");
        expect(logSpy).toHaveBeenNthCalledWith(2, "b");
        expect(logSpy).toHaveBeenNthCalledWith(3, "c");
    })
})

describe('GroupIterator class', () => {
    it('exists', () => {
        expect(GroupIterator).toBeDefined();
    })
    it('can iterate thru an instance of the Group class if called with next()', () => {
        const group = Group.from(["a", "b"]);
        const groupIterator = new GroupIterator(group);
        expect(groupIterator.next()).toStrictEqual({ value: "a", done: false });
        expect(groupIterator.next()).toStrictEqual({ value: "b", done: false });
        expect(groupIterator.next()).toStrictEqual({ value: undefined, done: true });
    })
})