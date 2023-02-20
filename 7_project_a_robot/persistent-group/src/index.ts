/*
Question: 
Why do you need only one PGroup.empty value, rather than having a function that creates a new, empty map every time?

Answer: 
You need only one empty instance because all empty groups are the same and instances of the class don’t change. You can create many different groups from that single empty group without affecting it.
*/

export class PGroup {
    list: any[] = [];
    
    constructor(iterable: any = []) {
        for (let i of iterable) {
            this.list.push(i);
        }
    }

    add(value: any): PGroup {
        if (!this.has(value)) {
            return new PGroup([...this.list, value]);
        }
        return this;
    }

    delete(value: any): PGroup {
        if (this.has(value)) {
            return new PGroup(this.list.filter((el: any) => el !== value));
        }
        return this;
    }

    has(value: any): boolean {
        return this.list.indexOf(value) !== -1;
    }

    static get empty(): PGroup {
        return new PGroup([]);
    }
}
