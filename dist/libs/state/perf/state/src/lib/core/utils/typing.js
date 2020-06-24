"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPromiseGuard(value) {
    return (!!value &&
        typeof value.subscribe !== 'function' &&
        typeof value.then === 'function');
}
exports.isPromiseGuard = isPromiseGuard;
function isOperateFnArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every(function (i) { return typeof i === 'function'; });
}
exports.isOperateFnArrayGuard = isOperateFnArrayGuard;
function isStringArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every(function (i) { return typeof i === 'string'; });
}
exports.isStringArrayGuard = isStringArrayGuard;
function isIterableGuard(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
exports.isIterableGuard = isIterableGuard;
function isKeyOf(k) {
    return (!!k &&
        (typeof k === 'string' || typeof k === 'symbol' || typeof k === 'number'));
}
exports.isKeyOf = isKeyOf;
//# sourceMappingURL=typing.js.map