import { merge, queueScheduler, Subject } from 'rxjs';
import { mergeAll, observeOn } from 'rxjs/operators';
export function createSideEffectObservable(stateObservables) {
    if (stateObservables === void 0) { stateObservables = new Subject(); }
    var effects$ = merge(stateObservables.pipe(mergeAll(), observeOn(queueScheduler)));
    function nextEffectObservable(effect$) {
        stateObservables.next(effect$);
    }
    function subscribe() {
        return effects$.subscribe();
    }
    return {
        effects$: effects$,
        nextEffectObservable: nextEffectObservable,
        subscribe: subscribe
    };
}
//# sourceMappingURL=side-effect-observable.js.map