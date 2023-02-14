// linked lists stuff
export class ListNode {
    value: number = 0;
    rest: ListNode | null = null;
    constructor(value: number = 0, rest?: null | ListNode) {
        this.value = value;
        this.rest = rest === undefined ? null : rest;
    }
}

export function arrayToList(array: number[]): ListNode | null {
    const dummy = new ListNode();
    let curr = dummy;
    for (let el of array) {
        const newNode = new ListNode(el);
        curr.rest = newNode;
        curr = curr.rest;
    }
    return dummy.rest;
}

export function listToArray(head: ListNode | null | undefined): number[] {
    if (head === null || head === undefined) return [];
    const res: number[] = [];
    while (head !== null) {
        res.push(head.value);
        head = head.rest;
    }
    return res;
}

export function prepend(element: number, head: ListNode | null): ListNode | null {
    const newHead = new ListNode(element, head)
    return newHead;
}

export function nth(head: ListNode | null, element: number): number | undefined {
    let pos = 0;
    while (head) {
        if (head.value === element) return pos;
        pos++;
        head = head.rest;
    }
    return;
}

export function nthRecursive(head: ListNode | null, element: number, pos: number = 0): number | undefined  {
    if (head === null || head === undefined) return;
    if (head.value === element) return pos;
    return nthRecursive(head.rest, element, pos + 1);
}