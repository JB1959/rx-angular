import { filter, map } from 'rxjs/operators';
import { distinctUntilSomeChanged } from './distinctUntilSomeChanged';
/**
 * @internal
 */
export function selectSlice(keysOrMap, compare) {
    const keys = Array.isArray(keysOrMap)
        ? keysOrMap
        : Object.keys(keysOrMap);
    const distinctOperator = Array.isArray(keysOrMap)
        ? distinctUntilSomeChanged(keysOrMap, compare)
        : distinctUntilSomeChanged(keysOrMap);
    return (o$) => o$.pipe(
    // to avoid emissions of empty objects map to present values and filter out emissions with no values present
    map(state => ({
        definedKeys: keys.filter(k => state.hasOwnProperty(k) && state[k] !== undefined),
        state
    })), filter(({ definedKeys, state }) => !!definedKeys.length), 
    // create view-model
    map(({ definedKeys, state }) => definedKeys
        .filter(k => state.hasOwnProperty(k) && state[k] !== undefined)
        .reduce((vm, key) => {
        vm[key] = state[key];
        return vm;
    }, {})), 
    // forward distinct values
    distinctOperator);
}
//# sourceMappingURL=selectSlice.js.map