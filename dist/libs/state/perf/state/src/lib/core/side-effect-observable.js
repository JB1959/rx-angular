"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function createSideEffectObservable(stateObservables) {
    if (stateObservables === void 0) { stateObservables = new rxjs_1.Subject(); }
    var effects$ = rxjs_1.merge(stateObservables.pipe(operators_1.mergeAll(), operators_1.observeOn(rxjs_1.queueScheduler)));
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
exports.createSideEffectObservable = createSideEffectObservable;
//# sourceMappingURL=side-effect-observable.js.map