"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverTypedData = exports.signTypedData = exports.hashTypedData = void 0;
var ethSigUtil = require("eth-sig-util");
var ethUtil = require("ethereumjs-util");
function hashTypedData(typedData) {
    return ethUtil.toBuffer(ethSigUtil.typedSignatureHash(typedData));
}
exports.hashTypedData = hashTypedData;
function signTypedData(typedData, privateKey) {
    return ethSigUtil.signTypedData(privateKey, { data: typedData });
}
exports.signTypedData = signTypedData;
function recoverTypedData(typedData, signature) {
    return ethUtil.toChecksumAddress(ethSigUtil.recoverTypedSignature({ data: typedData, sig: signature }));
}
exports.recoverTypedData = recoverTypedData;
//# sourceMappingURL=eip712Legacy.js.map