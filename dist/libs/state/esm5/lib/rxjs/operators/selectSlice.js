import { filter, map } from 'rxjs/operators';
import { distinctUntilSomeChanged } from './distinctUntilSomeChanged';
/**
 * @internal
 */
export function selectSlice(keysOrMap, compare) {
    var keys = Array.isArray(keysOrMap)
        ? keysOrMap
        : Object.keys(keysOrMap);
    var distinctOperator = Array.isArray(keysOrMap)
        ? distinctUntilSomeChanged(keysOrMap, compare)
        : distinctUntilSomeChanged(keysOrMap);
    return function (o$) {
        return o$.pipe(
        // to avoid emissions of empty objects map to present values and filter out emissions with no values present
        map(function (state) { return ({
            definedKeys: keys.filter(function (k) { return state.hasOwnProperty(k) && state[k] !== undefined; }),
            state: state
        }); }), filter(function (_a) {
            var definedKeys = _a.definedKeys, state = _a.state;
            return !!definedKeys.length;
        }), 
        // create view-model
        map(function (_a) {
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
//# sourceMappingURL=selectSlice.js.map