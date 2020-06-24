import { distinctUntilChanged } from 'rxjs/operators';
/**
 * @internal
 */
const defaultCompare = (oldVal, newVal) => oldVal === newVal;
const ɵ0 = defaultCompare;
/**
 * @internal
 */
export function distinctUntilSomeChanged(keysOrMap, compare) {
    let distinctCompare;
    if (Array.isArray(keysOrMap)) {
        const keys = keysOrMap;
        const innerCompare = compare ? compare : defaultCompare;
        distinctCompare = (oldState, newState) => keys.some(key => !innerCompare(oldState[key], newState[key]));
    }
    else {
        const keyComparatorMap = keysOrMap;
        const innerCompare = (a, b, customCompFn) => customCompFn ? customCompFn(a, b) : defaultCompare(a, b);
        distinctCompare = (oldState, newState) => {
            return Object.keys(keyComparatorMap).some(key => !innerCompare(oldState[key], newState[key], keyComparatorMap[key]));
        };
    }
    return distinctUntilChanged((oldV, newV) => !distinctCompare(oldV, newV));
}
export { ɵ0 };
//# sourceMappingURL=distinctUntilSomeChanged.js.map