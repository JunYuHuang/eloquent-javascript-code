export class Group<T> {
    list: T[];
    
    constructor() {
        this.list = [];
    }

    get size() {
        return this.list.length;
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
}