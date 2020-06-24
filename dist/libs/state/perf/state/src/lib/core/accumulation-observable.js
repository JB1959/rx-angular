"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var defaultAccumulator = function (st, sl) {
    return tslib_1.__assign(tslib_1.__assign({}, st), sl);
};
function createAccumulationObservable(stateObservables, stateSlices, accumulatorObservable) {
    if (stateObservables === void 0) { stateObservables = new rxjs_1.Subject(); }
    if (stateSlices === void 0) { stateSlices = new rxjs_1.Subject(); }
    if (accumulatorObservable === void 0) { accumulatorObservable = new rxjs_1.BehaviorSubject(defaultAccumulator); }
    var signal$ = rxjs_1.merge(stateObservables.pipe(operators_1.distinctUntilChanged(), operators_1.mergeAll(), operators_1.observeOn(rxjs_1.queueScheduler)), stateSlices.pipe(operators_1.observeOn(rxjs_1.queueScheduler))).pipe(operators_1.withLatestFrom(accumulatorObservable.pipe(operators_1.observeOn(rxjs_1.queueScheduler))), operators_1.scan(function (state, _a) {
        var _b = tslib_1.__read(_a, 2), slice = _b[0], stateAccumulator = _b[1];
        return stateAccumulator(state, slice);
    }, {}), operators_1.tap(function (newState) { return (compositionObservable.state = newState); }), operators_1.publish());
    var state$ = signal$.pipe(operators_1.publishReplay(1));
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
exports.createAccumulationObservable = createAccumulationObservable;
//# sourceMappingURL=accumulation-observable.js.map