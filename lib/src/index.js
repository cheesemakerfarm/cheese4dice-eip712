"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./eip712"), exports);
var eip712Legacy_1 = require("./eip712Legacy");
Object.defineProperty(exports, "recoverTypedDataLegacy", { enumerable: true, get: function () { return eip712Legacy_1.recoverTypedData; } });
Object.defineProperty(exports, "signTypedDataLegacy", { enumerable: true, get: function () { return eip712Legacy_1.signTypedData; } });
Object.defineProperty(exports, "hashTypedDataLegacy", { enumerable: true, get: function () { return eip712Legacy_1.hashTypedData; } });
//# sourceMappingURL=index.js.map