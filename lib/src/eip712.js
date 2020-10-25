"use strict";
// EIP 712 encoding
// Most taken from https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverTypedData = exports.signTypedData = exports.hashTypedData = void 0;
var ethSigUtil = require("eth-sig-util");
var abi = require("ethereumjs-abi");
var ethUtil = require("ethereumjs-util");
var PRIMITIVE_TYPES = [
    /^bytes[0-9]|[0-2][0-9]|3[0-2]$/,
    /^(?:uint)8|16|32|64|128|256$/,
    /^(?:int)8|16|32|64|128|256$/,
    /^address$/,
    /^bool$/,
    /^bytes$/,
    /^string$/
];
function isPrimitiveType(type) {
    return PRIMITIVE_TYPES.some(function (regex) { return regex.test(type); });
}
// Recursively finds all the dependencies of a type
function dependencies(primaryType, types, found) {
    if (found === void 0) { found = []; }
    if (found.includes(primaryType)) {
        return found;
    }
    if (types[primaryType] === undefined) {
        if (!isPrimitiveType(primaryType)) {
            throw Error(primaryType + " is not a primitive type!");
        }
        return found;
    }
    found.push(primaryType);
    for (var _i = 0, _a = types[primaryType]; _i < _a.length; _i++) {
        var field = _a[_i];
        for (var _b = 0, _c = dependencies(field.type, types, found); _b < _c.length; _b++) {
            var dep = _c[_b];
            if (!found.includes(dep)) {
                found.push(dep);
            }
        }
    }
    return found;
}
function encodeType(primaryType, types) {
    // Get dependencies primary first, then alphabetical
    var deps = dependencies(primaryType, types);
    deps = deps.filter(function (t) { return t !== primaryType; });
    deps = [primaryType].concat(deps.sort());
    // Format as a string with fields
    var result = '';
    for (var _i = 0, deps_1 = deps; _i < deps_1.length; _i++) {
        var depType = deps_1[_i];
        result += depType + "(" + types[depType].map(function (_a) {
            var name = _a.name, type = _a.type;
            return type + " " + name;
        }).join(',') + ")";
    }
    return result;
}
function typeHash(primaryType, types) {
    return ethUtil.sha3(encodeType(primaryType, types));
}
function encodeData(primaryType, types, data) {
    var encTypes = [];
    var encValues = [];
    // Add typehash
    encTypes.push('bytes32');
    encValues.push(typeHash(primaryType, types));
    // Add field contents
    for (var _i = 0, _a = types[primaryType]; _i < _a.length; _i++) {
        var field = _a[_i];
        var value = data[field.name];
        if (value === undefined) {
            throw Error("Invalid typed data! Data for " + field.name + " not found!");
        }
        if (field.type === 'string' || field.type === 'bytes') {
            encTypes.push('bytes32');
            var valueHash = ethUtil.sha3(value);
            encValues.push(valueHash);
        }
        else if (types[field.type] !== undefined) {
            encTypes.push('bytes32');
            var valueHash = ethUtil.sha3(encodeData(field.type, types, value));
            encValues.push(valueHash);
        }
        else if (field.type.lastIndexOf(']') === field.type.length - 1) {
            throw new Error('Arrays currently not implemented!');
        }
        else {
            if (!isPrimitiveType(field.type)) {
                throw Error("Invalid primitive type " + field.type);
            }
            encTypes.push(field.type);
            encValues.push(value);
        }
    }
    return abi.rawEncode(encTypes, encValues);
}
function structHash(primaryType, types, data) {
    return ethUtil.sha3(encodeData(primaryType, types, data));
}
function hashTypedData(typedData) {
    return ethUtil.sha3(Buffer.concat([
        Buffer.from('1901', 'hex'),
        structHash('EIP712Domain', typedData.types, typedData.domain),
        structHash(typedData.primaryType, typedData.types, typedData.message),
    ]));
}
exports.hashTypedData = hashTypedData;
function signTypedData(typedData, privateKey) {
    var hash = hashTypedData(typedData);
    var sig = ethUtil.ecsign(hash, privateKey);
    return ethSigUtil.concatSig(sig.v, sig.r, sig.s);
}
exports.signTypedData = signTypedData;
function recoverTypedData(typedData, signature) {
    var hash = hashTypedData(typedData);
    var sigParams = ethUtil.fromRpcSig(signature);
    var pubKey = ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s);
    var address = ethUtil.pubToAddress(pubKey);
    return ethUtil.toChecksumAddress(ethUtil.bufferToHex(address));
}
exports.recoverTypedData = recoverTypedData;
//# sourceMappingURL=eip712.js.map