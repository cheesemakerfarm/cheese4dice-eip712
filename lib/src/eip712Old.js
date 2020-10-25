"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethSigUtil = require("eth-sig-util");
var ethUtil = require("ethereumjs-util");
function typedDataHash(typedData) {
    return ethUtil.toBuffer(ethSigUtil.typedSignatureHash(typedData));
}
exports.typedDataHash = typedDataHash;
function signTypedData(typedData, privateKey) {
    return ethSigUtil.signTypedData(privateKey, { data: typedData });
}
exports.signTypedData = signTypedData;
function recoverTypedData(typedData, signature) {
    return ethUtil.toChecksumAddress(ethSigUtil.recoverTypedSignature({ data: typedData, sig: signature }));
}
exports.recoverTypedData = recoverTypedData;
//# sourceMappingURL=eip712Old.js.map