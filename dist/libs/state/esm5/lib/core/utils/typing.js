export function isPromiseGuard(value) {
    return (!!value &&
        typeof value.subscribe !== 'function' &&
        typeof value.then === 'function');
}
export function isOperateFnArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every(function (i) { return typeof i === 'function'; });
}
export function isStringArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every(function (i) { return typeof i === 'string'; });
}
export function isIterableGuard(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
export function isKeyOf(k) {
    return (!!k &&
        (typeof k === 'string' || typeof k === 'symbol' || typeof k === 'number'));
}
//# sourceMappingURL=typing.js.map