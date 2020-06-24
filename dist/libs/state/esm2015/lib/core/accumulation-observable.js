import { BehaviorSubject, merge, queueScheduler, Subject } from 'rxjs';
import { distinctUntilChanged, mergeAll, observeOn, publish, publishReplay, scan, tap, withLatestFrom } from 'rxjs/operators';
const defaultAccumulator = (st, sl) => {
    return Object.assign(Object.assign({}, st), sl);
};
const ɵ0 = defaultAccumulator;
export function createAccumulationObservable(stateObservables = new Subject(), stateSlices = new Subject(), accumulatorObservable = new BehaviorSubject(defaultAccumulator)) {
    const signal$ = merge(stateObservables.pipe(distinctUntilChanged(), mergeAll(), observeOn(queueScheduler)), stateSlices.pipe(observeOn(queueScheduler))).pipe(withLatestFrom(accumulatorObservable.pipe(observeOn(queueScheduler))), scan((state, [slice, stateAccumulator]) => stateAccumulator(state, slice), {}), tap(newState => (compositionObservable.state = newState)), publish());
    const state$ = signal$.pipe(publishReplay(1));
    const compositionObservable = {
        state: {},
        signal$,
        state$,
        nextSlice,
        nextSliceObservable,
        nextAccumulator,
        subscribe
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
        const sub = compositionObservable.signal$.connect();
        sub.add(compositionObservable.state$.connect());
        return sub;
    }
}
export { ɵ0 };
//# sourceMappingURL=accumulation-observable.js.map