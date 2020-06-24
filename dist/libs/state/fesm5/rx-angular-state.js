import { __spread, __assign, __read, __decorate, __metadata } from 'tslib';
import { Injectable } from '@angular/core';
import { noop, Subject, BehaviorSubject, merge, queueScheduler, Subscription, isObservable } from 'rxjs';
import { distinctUntilChanged, filter, shareReplay, pluck, map, mergeAll, observeOn, withLatestFrom, scan, tap, publish, publishReplay } from 'rxjs/operators';

function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

function isPromiseGuard(value) {
    return (!!value &&
        typeof value.subscribe !== 'function' &&
        typeof value.then === 'function');
}
function isOperateFnArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every(function (i) { return typeof i === 'function'; });
}
function isStringArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every(function (i) { return typeof i === 'string'; });
}
function isIterableGuard(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
function isKeyOf(k) {
    return (!!k &&
        (typeof k === 'string' || typeof k === 'symbol' || typeof k === 'number'));
}

/**
 * @description
 *
 * As it acts like the Observables `pipe` method, it accepts one or many RxJS operators as params.
 *
 * @example
 * import { Observable } from 'rxjs';
 * import { map } from 'rxjs/operators';
 * import { stateful } from 'rx-angular/state';
 *
 * const state$: Observable<{ name: string; items: string[] }>;
 * const derivation$ = state$.pipe(
 *   stateful(
 *     map(state => state.list.length),
 *     filter(length => length > 3)
 *   )
 * );
 *
 * @param {OperatorFunction<T, A>} op - one or multiple passed operator comma separated
 *
 * @docsPage stateful
 * @docsCategory operators
 */
function stateful() {
    var optionalDerive = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        optionalDerive[_i] = arguments[_i];
    }
    return function (s) {
        return s.pipe(
        // distinct same base-state objects (e.g. a default emission of default switch cases, incorrect mutable handling
        // of data) @TODO evaluate benefits vs. overhead
        distinctUntilChanged(), 
        // CUSTOM LOGIC HERE
        function (o) {
            if (isOperateFnArrayGuard(optionalDerive)) {
                return o.pipe(pipeFromArray(optionalDerive));
            }
            return o;
        }, 
        // initial emissions, undefined is no base-state, pollution with skip(1)
        filter(function (v) { return v !== undefined; }), 
        // distinct same derivation value
        distinctUntilChanged(), 
        // reuse custom operations result for multiple subscribers and reemit the last calculated value.
        shareReplay({ bufferSize: 1, refCount: true }));
    };
}

/**
 * @internal
 */
function select() {
    var opOrMapFn = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        opOrMapFn[_i] = arguments[_i];
    }
    return function (state$) {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return state$.pipe(stateful());
        }
        else if (isStringArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful(pluck.apply(void 0, __spread(opOrMapFn))));
        }
        else if (isOperateFnArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful(pipeFromArray(opOrMapFn)));
        }
        else {
            throw new Error('wrong params passed to select');
        }
    };
}

/**
 * @internal
 */
var defaultCompare = function (oldVal, newVal) {
    return oldVal === newVal;
};
var ɵ0 = defaultCompare;
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
    return distinctUntilChanged(function (oldV, newV) { return !distinctCompare(oldV, newV); });
}

/**
 * @internal
 */
function selectSlice(keysOrMap, compare) {
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

var defaultAccumulator = function (st, sl) {
    return __assign(__assign({}, st), sl);
};
var ɵ0$1 = defaultAccumulator;
function createAccumulationObservable(stateObservables, stateSlices, accumulatorObservable) {
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

function createSideEffectObservable(stateObservables) {
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

/**
 * @description
 * RxState is a light-weight reactive state management service for managing local state in angular.
 *
 * ![state logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_logo.png)
 *
 * @example
 * Component({
 *   selector: 'app-stateful',
 *   template: `<div>{{ state$ | async | json }}</div>`,
 *   providers: [RxState]
 * })
 * export class StatefulComponent {
 *   readonly state$ = this.state.select();
 *
 *   constructor(private state: RxState<{ foo: string }>) {}
 * }
 *
 * @docsCategory RxState
 * @docsPage RxState
 */
var RxState = /** @class */ (function () {
    /**
     * @internal
     */
    function RxState() {
        this.subscription = new Subscription();
        this.accumulator = createAccumulationObservable();
        this.effectObservable = createSideEffectObservable();
        /**
         * @description
         * The unmodified state exposed as `Observable<T>`. It is not shared, distinct or gets replayed.
         * Use the `$` property if you want to read the state without having applied {@link stateful} to it.
         */
        this.$ = this.accumulator.signal$;
        this.subscription.add(this.subscribe());
    }
    /**
     * @internal
     */
    RxState.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    RxState.prototype.setAccumulator = function (accumulatorFn) {
        this.accumulator.nextAccumulator(accumulatorFn);
    };
    /**
     * @description
     * Read from the state in imperative manner. Returns the state object in its current state.
     *
     * @example
     * const { disabled } = state.get();
     * if (!disabled) {
     *   doStuff();
     * }
     *
     * @return T
     */
    RxState.prototype.get = function () {
        return this.accumulator.state;
    };
    /**
     * @internal
     */
    RxState.prototype.set = function (keyOrStateOrProjectState, stateOrSliceProjectFn) {
        if (typeof keyOrStateOrProjectState === 'object' &&
            stateOrSliceProjectFn === undefined) {
            this.accumulator.nextSlice(keyOrStateOrProjectState);
            return;
        }
        if (typeof keyOrStateOrProjectState === 'function' &&
            stateOrSliceProjectFn === undefined) {
            this.accumulator.nextSlice(keyOrStateOrProjectState(this.accumulator.state));
            return;
        }
        if (isKeyOf(keyOrStateOrProjectState) &&
            typeof stateOrSliceProjectFn === 'function') {
            var state = {};
            state[keyOrStateOrProjectState] = stateOrSliceProjectFn(this.accumulator.state);
            this.accumulator.nextSlice(state);
            return;
        }
        throw new Error('wrong params passed to set');
    };
    /**
     * @internal
     */
    RxState.prototype.connect = function (keyOrInputOrSlice$, projectOrSlices$, projectValueFn) {
        var _this = this;
        if (isObservable(keyOrInputOrSlice$) &&
            projectOrSlices$ === undefined &&
            projectValueFn === undefined) {
            var slice$ = keyOrInputOrSlice$.pipe(filter(function (slice) { return slice !== undefined; }));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (isObservable(keyOrInputOrSlice$) &&
            typeof projectOrSlices$ === 'function' &&
            !isObservable(projectOrSlices$) &&
            projectValueFn === undefined) {
            var project_1 = projectOrSlices$;
            var slice$ = keyOrInputOrSlice$.pipe(filter(function (slice) { return slice !== undefined; }), map(function (v) { return project_1(_this.get(), v); }));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (isKeyOf(keyOrInputOrSlice$) &&
            isObservable(projectOrSlices$) &&
            projectValueFn === undefined) {
            var key_1 = keyOrInputOrSlice$;
            var slice$ = projectOrSlices$.pipe(filter(function (slice) { return slice !== undefined; }), map(function (value) {
                var _a;
                return (__assign({}, (_a = {}, _a[key_1] = value, _a)));
            }));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (isKeyOf(keyOrInputOrSlice$) &&
            isObservable(projectOrSlices$) &&
            typeof projectValueFn === 'function') {
            var key_2 = keyOrInputOrSlice$;
            var slice$ = projectOrSlices$.pipe(filter(function (slice) { return slice !== undefined; }), map(function (value) {
                var _a;
                return (__assign({}, (_a = {}, _a[key_2] = projectValueFn(_this.get(), value), _a)));
            }));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        throw new Error('wrong params passed to connect');
    };
    /**
     * @internal
     */
    RxState.prototype.select = function () {
        var opOrMapFn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opOrMapFn[_i] = arguments[_i];
        }
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return this.accumulator.state$.pipe(stateful());
        }
        else if (isStringArrayGuard(opOrMapFn)) {
            return this.accumulator.state$.pipe(stateful(pluck.apply(void 0, __spread(opOrMapFn))));
        }
        else if (isOperateFnArrayGuard(opOrMapFn)) {
            return this.accumulator.state$.pipe(stateful(pipeFromArray(opOrMapFn)));
        }
        throw new Error('wrong params passed to select');
    };
    /**
     * @description
     * Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
     * `sideEffectFunction`.
     * Subscription handling is done automatically.
     *
     * @example
     * // Directly pass an observable side-effect
     * const localStorageEffect$ = changes$.pipe(
     *  tap(changes => storeChanges(changes))
     * );
     * state.hold(localStorageEffect$);
     *
     * // Pass an additional `sideEffectFunction`
     *
     * const localStorageEffectFn = changes => storeChanges(changes);
     * state.hold(changes$, localStorageEffectFn);
     *
     * @param {Observable<S>} obsOrObsWithSideEffect
     * @param {function} [sideEffectFn]
     */
    RxState.prototype.hold = function (obsOrObsWithSideEffect, sideEffectFn) {
        if (typeof sideEffectFn === 'function') {
            this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect.pipe(tap(sideEffectFn)));
            return;
        }
        this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
    };
    /**
     * @internal
     */
    RxState.prototype.subscribe = function () {
        var subscription = new Subscription();
        subscription.add(this.accumulator.subscribe());
        subscription.add(this.effectObservable.subscribe());
        return subscription;
    };
    RxState = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], RxState);
    return RxState;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { RxState, distinctUntilSomeChanged, select, selectSlice, stateful };
//# sourceMappingURL=rx-angular-state.js.map
