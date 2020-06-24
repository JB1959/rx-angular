import { __assign, __read } from "tslib";
import { BehaviorSubject, merge, queueScheduler, Subject } from 'rxjs';
import { distinctUntilChanged, mergeAll, observeOn, publish, publishReplay, scan, tap, withLatestFrom } from 'rxjs/operators';
var defaultAccumulator = function (st, sl) {
    return __assign(__assign({}, st), sl);
};
var ɵ0 = defaultAccumulator;
export function createAccumulationObservable(stateObservables, stateSlices, accumulatorObservable) {
    if (stateObservables === void 0) { stateObservables = new Subject(); }
    if (stateSlices === void 0) { stateSlices = new Subject(); }
    if (accumulatorObservable === void 0) { accumulatorObservable = new BehaviorSubject(defaultAccumulator); }
    var signal$ = merge(stateObservables.pipe(distinctUntilChanged(), mergeAll(), observeOn(queueScheduler)), stateSlices.pipe(observeOn(queueScheduler))).pipe(withLatestFrom(accumulatorObservable.pipe(observeOn(queueScheduler))), scan(function (state, _a) {
        var _b = __read(_a, 2), slice = _b[0], stateAccumulator = _b[1];
        return stateAccumulator(state, slice);
    }, {}), tap(function (newState) { return (compositionObservable.state = newState); }), publish());
    var state$ = signal$.pipe(publishReplay(1));
    var compositionObservable = {
        state: {},
        signal$: signal$,
        state$: state$,
        nextSlice: nextSlice,
        nextSliceObservable: nextSliceObservable,
        nextAccumulator: nextAccumulator,
        subscribe: subscribe
    };
    // ======
    return compositionObservable;
    // ======
    function nextAccumulator(accumulatorFn) {
        accumulatorObservable.next(accumulatorFn);
    }
    function nextSlice(stateSlice) {
        stateSlices.next(stateSlice);
    }
    function nextSliceObservable(stateObservable) {
        stateObservables.next(stateObservable);
    }
    function subscribe() {
        var sub = compositionObservable.signal$.connect();
        sub.add(compositionObservable.state$.connect());
        return sub;
    }
}
export { ɵ0 };
//# sourceMappingURL=accumulation-observable.js.map