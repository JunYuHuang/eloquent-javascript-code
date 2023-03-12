"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var regex = new RegExp(process.argv[2]);
var fileNames = process.argv.slice(3);
function search(file) {
    var stats = (0, fs_1.statSync)(file);
    if (stats.isDirectory()) {
        for (var _i = 0, _a = (0, fs_1.readdirSync)(file); _i < _a.length; _i++) {
            var f = _a[_i];
            search("".concat(file, "/").concat(f));
        }
    }
    else if (regex.test((0, fs_1.readFileSync)(file, "utf-8"))) {
        console.log(file);
    }
}
for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
    var name = fileNames_1[_i];
    search(name);
}
//# sourceMappingURL=index.js.map