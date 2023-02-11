export function fizzBuzz(n: number): string {
    const divBy3 = n % 3 == 0;
    const divBy5 = n % 5 == 0;
    if (divBy3 && divBy5) return "FizzBuzz";
    if (divBy3) return "Fizz";
    if (divBy5) return "Buzz"
    return n.toString();
}

export function printFizzBuzz(): void {
    for (let i = 1; i <= 100; i++) {
        console.log(fizzBuzz(i));
    }
}