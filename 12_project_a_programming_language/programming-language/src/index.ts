/* 

Project: Egg, a Programming Language

Intro
- everything is an expression
- expression types (1 of the following):
    - binding: name with no special meaning
    - number: digit sequence
    - string: char sequence in double quotes
    - application -- function calls, constructs like `if` or `while`
- call functions with comma-seperated arguments in parentheses like in JS
- uses `do` construct to do multiple things in a sequence to replace blocks

Parser Notes
- represents Egg programs with the expression object data structure
- transforms text input into expression objects

*/

// TYPES
type exprObj = {
    type: string,
    [property: string]: any
}

function parseExpression(program: string) {
    program = skipSpace(program);
    let match: RegExpExecArray | null, expr: exprObj;
    if (match = /^"([^"]*)"/.exec(program)) {
        expr = { type: "value", value: match[1] };
    } else if (match = /^\d+\b/.exec(program)) {
        expr = { type: "value", value: Number(match[0]) };
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = { type: "word", name: match[0] };
    } else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

// // Original skipSpace()
// function skipSpace(string: string) {
//     let first = string.search(/\S/);
//     if (first == -1) return "";
//     return string.slice(first);
// }

// Modified skipSpace() for `Comments` exercise
function skipSpace(string: string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    let spaceSkippedStr = string.slice(first);
    const whitespaceOrCommentRegex = /^(\s|#.*\n)*/;
    const execArr = whitespaceOrCommentRegex.exec(spaceSkippedStr);
    return execArr ? spaceSkippedStr.slice(execArr[0].length) : spaceSkippedStr;
}

function parseApply(expr: exprObj, program: string): any {
    program = skipSpace(program);
    if (program[0] != "(") {
        return { expr: expr, rest: program };
    }

    program = skipSpace(program.slice(1));
    expr = { type: "apply", operator: expr, args: [] };
    while (program[0] != ")") {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}

function parse(program: string) {
    let { expr, rest } = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}

var specialForms = Object.create(null);

function evaluate(expr: exprObj, scope: any): any {
    if (expr.type == "value") {
        return expr.value;
    } else if (expr.type == "word") {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(
                `Undefined binding: ${expr.name}`);
        }
    } else if (expr.type == "apply") {
        let { operator, args } = expr;
        if (operator.type == "word" &&
            operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);
            if (typeof op == "function") {
                return op(...args.map((arg: any) => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a non-function.");
            }
        }
    }
}

specialForms.if = (args: any[], scope: any) => {
    if (args.length != 3) {
        throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

specialForms.while = (args: any[], scope: any) => {
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }

    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;
};

specialForms.do = (args: any[], scope: any) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

specialForms.define = (args: any[], scope: any) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

// Add-on from "Fixing Scope" exercise
specialForms.set = (args: any[], scope: any) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of set");
    }
    let bindingName = args[0].name;
    let value = evaluate(args[1], scope);
    while (scope != null) {
        let bindingExists = Object.prototype.hasOwnProperty.call(scope, bindingName);
        if (bindingExists) {
            scope[bindingName] = value;
            return value;
        }
        scope = Object.getPrototypeOf(scope);
    }
    throw new ReferenceError(`Cannot set value to non-existent binding or variable ${bindingName}!`);
}

var topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = (value: any) => {
    console.log(value);
    return value;
};

function run(program: string) {
    return evaluate(parse(program), Object.create(topScope));
}

specialForms.fun = (args: any[], scope: any) => {
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });

    return function () {
        if (arguments.length != params.length) {
            throw new TypeError("Wrong number of arguments");
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(body, localScope);
    };
};

// Add-on from `Arrays` exercise
import { array, length, element } from "../../arrays/src/index";

topScope.array = array;
topScope.length = length;
topScope.element = element;

export {
    parse,
    evaluate,
    topScope,
    run,
    skipSpace,
    specialForms
}