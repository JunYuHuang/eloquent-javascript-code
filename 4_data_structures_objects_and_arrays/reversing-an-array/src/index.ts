/* 
Thinking back to the notes about side effects and pure functions in the
previous chapter, which variant do you expect to be useful in more situations?
Which one runs faster?

more useful = reverseArray() because it doesn't have any side effects i.e. mutating the original input array which makes it easier to understand / reason, test, and debug.

faster = reverseArrayInPlace() because it only swaps elements in the original input array and doesn't need to allocate extra memory, copy the elements to a new array, and deallocate the memory for the original array.
*/ 

export function reverseArray<T>(array: Array<T>): Array<T> {
    if (array.length === 0) return [];
    const res: Array<T> = [];
    for (let i = array.length - 1; i >= 0; i--) {
        res.push(array[i]);
    }
    return res
}

export function reverseArrayInPlace<T>(array: Array<T>): Array<T> {
    if (array.length === 0 || array.length === 1) return array;
    let left = 0;
    let right = array.length - 1;
    while (left <= right) {
        let temp = array[left];
        array[left] = array[right]
        array[right] = temp;
        left += 1;
        right -= 1;
    }
    return array;
}