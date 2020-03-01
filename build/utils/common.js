"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5 = require("crypto-js/md5");
function getMd5(str) {
    return md5(str).toString();
}
exports.getMd5 = getMd5;
//# sourceMappingURL=common.js.map