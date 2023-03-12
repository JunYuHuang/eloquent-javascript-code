import { readFileSync, readdirSync, statSync } from "fs";

const regex = new RegExp(process.argv[2]);
const fileNames = process.argv.slice(3);

function search(file: string) {
    let stats = statSync(file);
    if (stats.isDirectory()) {
        for (let f of readdirSync(file)) {
            search(`${file}/${f}`);
        }
    } else if (regex.test(readFileSync(file, "utf-8"))) {
        console.log(file);
    }
}

for (let name of fileNames) {
    search(name);
}