export const box = {
    locked: true,
    unlock() {
      this.locked = false;
    },
    lock() {
      this.locked = true;
    },
    _content: [] as any[],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    },
};

export function withBoxUnlocked(body: Function, myBox?: typeof box) {
    myBox = myBox ? myBox : box;
    const isBoxInitiallyLocked = myBox.locked;
    if (isBoxInitiallyLocked) myBox.unlock();
    try {
        return body();
    } catch(error) {
        console.log(`Error: ${error}`);
    } finally {
        if (isBoxInitiallyLocked) myBox.lock();
    }
}