"use strict";
const textareaCode = document.querySelector("#code");
const buttonRun = document.querySelector("#button");
const preOutput = document.querySelector("#output");
function clickHandler(event) {
    event.preventDefault();
    const userFn = Function(String(textareaCode.value));
    let res = "";
    try {
        res = String(userFn());
    }
    catch (error) {
        res = "Error: " + String(error);
    }
    preOutput.appendChild(document.createTextNode(res + "\n"));
}
buttonRun.addEventListener("click", clickHandler);
//# sourceMappingURL=index.js.map