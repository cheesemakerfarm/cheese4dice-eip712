"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethSigUtil = require("eth-sig-util");
var ethUtil = require("ethereumjs-util");
function signData(typedData, privateKey) {
    return ethSigUtil.signTypedData(privateKey, { data: typedData });
}
exports.signData = signData;
function recoverSignature(typedData, signature) {
    return ethUtil.toChecksumAddress(ethSigUtil.recoverTypedSignature({ data: typedData, sig: signature }));
}
exports.recoverSignature = recoverSignature;
//# sourceMappingURL=eip712Old.js.map