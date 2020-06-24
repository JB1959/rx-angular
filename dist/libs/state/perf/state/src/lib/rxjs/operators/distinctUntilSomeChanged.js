"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
/**
 * @internal
 */
var defaultCompare = function (oldVal, newVal) {
    return oldVal === newVal;
};
/**
 * @internal
 */
function distinctUntilSomeChanged(keysOrMap, compare) {
    var distinctCompare;
    if (Array.isArray(keysOrMap)) {
        var keys_1 = keysOrMap;
        var innerCompare_1 = compare ? compare : defaultCompare;
        distinctCompare = function (oldState, newState) {
            return keys_1.some(function (key) { return !innerCompare_1(oldState[key], newState[key]); });
        };
    }
    else {
        var keyComparatorMap_1 = keysOrMap;
        var innerCompare_2 = function (a, b, customCompFn) {
            return customCompFn ? customCompFn(a, b) : defaultCompare(a, b);
        };
        distinctCompare = function (oldState, newState) {
            return Object.keys(keyComparatorMap_1).some(function (key) {
                return !innerCompare_2(oldState[key], newState[key], keyComparatorMap_1[key]);
            });
        };
    }
    return operators_1.distinctUntilChanged(function (oldV, newV) { return !distinctCompare(oldV, newV); });
}
exports.distinctUntilSomeChanged = distinctUntilSomeChanged;
//# sourceMappingURL=distinctUntilSomeChanged.js.map