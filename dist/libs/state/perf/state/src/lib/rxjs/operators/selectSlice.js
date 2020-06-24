"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var distinctUntilSomeChanged_1 = require("./distinctUntilSomeChanged");
/**
 * @internal
 */
function selectSlice(keysOrMap, compare) {
    var keys = Array.isArray(keysOrMap)
        ? keysOrMap
        : Object.keys(keysOrMap);
    var distinctOperator = Array.isArray(keysOrMap)
        ? distinctUntilSomeChanged_1.distinctUntilSomeChanged(keysOrMap, compare)
        : distinctUntilSomeChanged_1.distinctUntilSomeChanged(keysOrMap);
    return function (o$) {
        return o$.pipe(
        // to avoid emissions of empty objects map to present values and filter out emissions with no values present
        operators_1.map(function (state) { return ({
            definedKeys: keys.filter(function (k) { return state.hasOwnProperty(k) && state[k] !== undefined; }),
            state: state
        }); }), operators_1.filter(function (_a) {
            var definedKeys = _a.definedKeys, state = _a.state;
            return !!definedKeys.length;
        }), 
        // create view-model
        operators_1.map(function (_a) {
            var definedKeys = _a.definedKeys, state = _a.state;
            return definedKeys
                .filter(function (k) { return state.hasOwnProperty(k) && state[k] !== undefined; })
                .reduce(function (vm, key) {
                vm[key] = state[key];
                return vm;
            }, {});
        }), 
        // forward distinct values
        distinctOperator);
    };
}
exports.selectSlice = selectSlice;
//# sourceMappingURL=selectSlice.js.map