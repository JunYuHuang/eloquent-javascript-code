export {};
import "jest";
import { ListNode, arrayToList, listToArray, prepend, nth, nthRecursive } from "./index";

describe('arrayToList()', () => {
    it('exists', () => {
        expect(arrayToList).toBeDefined();
    })
    it('returns a list from [1,2,3] when called with [1,2,3]', () => {
        const dummy: ListNode | null = new ListNode();
        let curr: ListNode | null = dummy;
        curr.rest = new ListNode(1);
        curr = curr.rest;
        curr.rest = new ListNode(2);
        curr = curr.rest;
        curr.rest = new ListNode(3);
        let res = arrayToList([1,2,3]);
        curr = dummy.rest;
        let resListLength = 0;
        while (curr && res) {
            expect(res.value).toStrictEqual(curr.value);
            expect(res.rest).toStrictEqual(curr.rest);
            resListLength += 1
            // console.log(`curr = ${curr.value}, res = ${res.value}`);
            res = res.rest;
            curr = curr.rest;
        }
        expect(resListLength).toStrictEqual(3);
    })
    it('returns null when called with []', () => {
        expect(arrayToList([])).toStrictEqual(null);
    })
})

describe('listToArray()', () => {
    it('exists', () => {
        expect(listToArray).toBeDefined();
    })
    it('returns [1,2,3] when called with list from [1,2,3]', () => {
        const dummy: ListNode = new ListNode();
        let curr: ListNode | null = dummy;
        curr.rest = new ListNode(1);
        curr = curr.rest;
        curr.rest = new ListNode(2);
        curr = curr.rest;
        curr.rest = new ListNode(3);
        expect(listToArray(dummy.rest)).toStrictEqual([1,2,3]);
    })
})

describe('prepend()', () => {
    it('exists', () => {
        expect(prepend).toBeDefined();
    })
    it('returns a list from [2,1] when called with (2, list from [1])', () => {
        const dummy = new ListNode();
        let oldListHead: ListNode | null = dummy;
        oldListHead.rest = new ListNode(1);

        const dummy2 = new ListNode();
        let expectedHead: ListNode | null = dummy2;
        expectedHead.rest = new ListNode(2);
        expectedHead = expectedHead.rest;
        expectedHead.rest = new ListNode(1);
        
        oldListHead = dummy.rest;
        expectedHead = dummy2.rest;
        let resHead: ListNode | null = prepend(2, oldListHead);
        let resHeadListLength = 0;
        while (resHead && expectedHead) {
            expect(resHead.value).toStrictEqual(expectedHead.value);
            expect(resHead.rest).toStrictEqual(expectedHead.rest);
            resHeadListLength += 1
            resHead = resHead.rest;
            expectedHead = expectedHead.rest;
        }
        expect(resHeadListLength).toStrictEqual(2);
    })
})

describe('nth()', () => {
    it('exists', () => {
        expect(nth).toBeDefined();
    })
    it('returns 1 when called with (list from [1,2,3], 2)', () => {
        const dummy: ListNode = new ListNode();
        let curr: ListNode | null = dummy;
        curr.rest = new ListNode(1);
        curr = curr.rest;
        curr.rest = new ListNode(2);
        curr = curr.rest;
        curr.rest = new ListNode(3);
        expect(nth(dummy.rest, 2)).toStrictEqual(1);
    })
    it('returns undefined when called with (list from [0,1], 42)', () => {
        const dummy: ListNode = new ListNode();
        let curr: ListNode | null = dummy;
        curr.rest = new ListNode(1);
        expect(nth(dummy, 42)).toStrictEqual(undefined);
    })
})

describe('nthRecursive()', () => {
    it('exists', () => {
        expect(nthRecursive).toBeDefined();
    })
    it('returns 1 when called with (list from [1,2,3], 2)', () => {
        const dummy: ListNode = new ListNode();
        let curr: ListNode | null = dummy;
        curr.rest = new ListNode(1);
        curr = curr.rest;
        curr.rest = new ListNode(2);
        curr = curr.rest;
        curr.rest = new ListNode(3);
        expect(nthRecursive(dummy.rest, 2)).toStrictEqual(1);
    })
    it('returns undefined when called with (list from [0,1], 42)', () => {
        const dummy: ListNode = new ListNode();
        let curr: ListNode | null = dummy;
        curr.rest = new ListNode(1);
        expect(nthRecursive(dummy, 42)).toStrictEqual(undefined);
    })
})