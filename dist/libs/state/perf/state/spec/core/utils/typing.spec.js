"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../src/lib/core/utils");
var rxjs_1 = require("rxjs");
describe('isPromiseGuard', function () {
    it('should return true for a Promise', function () {
        expect(utils_1.isPromiseGuard(new Promise(function () {
        }))).toBeTruthy();
        expect(utils_1.isPromiseGuard({
            then: function () {
            }
        })).toBeTruthy();
    });
    it('should return false if input is not a promise', function () {
        expect(utils_1.isPromiseGuard(true)).toBeFalsy();
        expect(utils_1.isPromiseGuard({ then: true })).toBeFalsy();
    });
});
describe('isOperateFnArrayGuard', function () {
    it('should return true for a array of functions', function () {
        expect(utils_1.isOperateFnArrayGuard([function () {
            }, function () {
            }, function () {
            }])).toBeTruthy();
    });
    it('should return false for other values', function () {
        expect(utils_1.isOperateFnArrayGuard(1)).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard([1, 2, 3])).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard(['1', '2', '3'])).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard('1')).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard(true)).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard([true, false, true])).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard({})).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard([{}, {}, {}])).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard([])).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard([[], [], []])).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard([rxjs_1.of(1), rxjs_1.from([]), rxjs_1.of(2)])).toBeFalsy();
        expect(utils_1.isOperateFnArrayGuard(rxjs_1.of(1))).toBeFalsy();
    });
});
describe('isStringArrayGuard', function () {
    it('should return true if input is an array of strings', function () {
        expect(utils_1.isStringArrayGuard(['1', '2', '3'])).toBeTruthy();
    });
    it('should return false for other input types', function () {
        expect(utils_1.isStringArrayGuard(1)).toBeFalsy();
        expect(utils_1.isStringArrayGuard([1, 2, 3])).toBeFalsy();
        expect(utils_1.isStringArrayGuard([function () { }, function () { }, function () { }])).toBeFalsy();
        expect(utils_1.isStringArrayGuard('1')).toBeFalsy();
        expect(utils_1.isStringArrayGuard(true)).toBeFalsy();
        expect(utils_1.isStringArrayGuard([true, false, true])).toBeFalsy();
        expect(utils_1.isStringArrayGuard({})).toBeFalsy();
        expect(utils_1.isStringArrayGuard([{}, {}, {}])).toBeFalsy();
        expect(utils_1.isStringArrayGuard([])).toBeFalsy();
        expect(utils_1.isStringArrayGuard([[], [], []])).toBeFalsy();
        expect(utils_1.isStringArrayGuard([rxjs_1.of(1), rxjs_1.from([]), rxjs_1.of(2)])).toBeFalsy();
        expect(utils_1.isStringArrayGuard(rxjs_1.of(1))).toBeFalsy();
    });
});
describe('isIterableGuard', function () {
    it('should return true if input is a Promise', function () {
        var _a;
        expect(utils_1.isIterableGuard([])).toBeTruthy();
        expect(utils_1.isIterableGuard((_a = {}, _a[Symbol.iterator] = function () { }, _a))).toBeTruthy();
    });
    it('should return false for input types other than Promise', function () {
        expect(utils_1.isIterableGuard(undefined)).toBeFalsy();
        expect(utils_1.isIterableGuard(null)).toBeFalsy();
        expect(utils_1.isIterableGuard(true)).toBeFalsy();
        expect(utils_1.isIterableGuard({})).toBeFalsy();
    });
});
describe('isKeyOf', function () {
    it('should return true if key exists', function () {
        expect(utils_1.isKeyOf('num')).toBeTruthy();
        expect(utils_1.isKeyOf(1)).toBeTruthy();
        expect(utils_1.isKeyOf(Symbol.iterator)).toBeTruthy();
    });
    it('should return false for no Promise', function () {
        expect(utils_1.isKeyOf(true)).toBeFalsy();
        expect(utils_1.isKeyOf([])).toBeFalsy();
        expect(utils_1.isKeyOf({})).toBeFalsy();
    });
});
//# sourceMappingURL=typing.spec.js.map