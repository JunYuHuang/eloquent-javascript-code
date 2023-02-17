export class Group<T> {
    list: T[];
    
    constructor() {
        this.list = [];
    }

    get size() {
        return this.list.length;
    }

    get(index: number): T {
        if (index < 0 || index >= this.size) throw Error("Invalid index!");
        return this.list[index];
    }

    add(value: T): void {
        if (!this.has(value)) this.list.push(value);
    }

    delete(value: T): void {
        if (this.has(value)) {
            this.list = this.list.filter((el) => el !== value);
        }
    }

    has(value: T): boolean {
        return this.list.indexOf(value) !== -1;
    }

    static from(iterable: any) {
        const group = new Group;
        for (let i of iterable) {
            group.add(i);
        }
        return group;
    }

    [Symbol.iterator] = (): GroupIterator<T> => {
        return new GroupIterator(this);
    }
}

export class GroupIterator<T> {
    index: number;
    group: Group<T>;

    constructor(group: Group<T>) {
        this.index = 0;
        this.group = group;
    }

    next() {
        if (this.index == this.group.size)  {
            return { value: undefined, done: true };
        }
        const res = this.group.get(this.index);
        this.index++;
        return {
            value: res,
            done: false
        }
    }
}