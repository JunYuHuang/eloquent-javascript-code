const textareaCode: HTMLTextAreaElement = document.querySelector("#code")!;
const buttonRun = document.querySelector("#button")!;
const preOutput = document.querySelector("#output")!;

function clickHandler(event: Event) {
    event.preventDefault();
    const userFn = Function(String(textareaCode!.value));
    let res = "";
    try {
        res = String(userFn());
    } catch (error) {
        res = "Error: " + String(error);
    }
    preOutput.appendChild(
        document.createTextNode(res + "\n")
    );
}

buttonRun.addEventListener("click", clickHandler);