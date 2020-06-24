import { __decorate, __metadata } from 'tslib';
import { Injectable } from '@angular/core';
import { noop, Subject, BehaviorSubject, merge, queueScheduler, Subscription, isObservable } from 'rxjs';
import { distinctUntilChanged, filter, shareReplay, pluck, map, mergeAll, observeOn, withLatestFrom, scan, tap, publish, publishReplay } from 'rxjs/operators';

import * as ɵngcc0 from '@angular/core';
function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce((prev, fn) => fn(prev), input);
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
    return op.length > 0 && op.every((i) => typeof i === 'function');
}
function isStringArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every((i) => typeof i === 'string');
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
function stateful(...optionalDerive) {
    return (s) => {
        return s.pipe(
        // distinct same base-state objects (e.g. a default emission of default switch cases, incorrect mutable handling
        // of data) @TODO evaluate benefits vs. overhead
        distinctUntilChanged(), 
        // CUSTOM LOGIC HERE
        (o) => {
            if (isOperateFnArrayGuard(optionalDerive)) {
                return o.pipe(pipeFromArray(optionalDerive));
            }
            return o;
        }, 
        // initial emissions, undefined is no base-state, pollution with skip(1)
        filter(v => v !== undefined), 
        // distinct same derivation value
        distinctUntilChanged(), 
        // reuse custom operations result for multiple subscribers and reemit the last calculated value.
        shareReplay({ bufferSize: 1, refCount: true }));
    };
}

/**
 * @internal
 */
function select(...opOrMapFn) {
    return (state$) => {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return state$.pipe(stateful());
        }
        else if (isStringArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful(pluck(...opOrMapFn)));
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
const defaultCompare = (oldVal, newVal) => oldVal === newVal;
const ɵ0 = defaultCompare;
/**
 * @internal
 */
function distinctUntilSomeChanged(keysOrMap, compare) {
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

/**
 * @internal
 */
function selectSlice(keysOrMap, compare) {
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

const defaultAccumulator = (st, sl) => {
    return Object.assign(Object.assign({}, st), sl);
};
const ɵ0$1 = defaultAccumulator;
function createAccumulationObservable(stateObservables = new Subject(), stateSlices = new Subject(), accumulatorObservable = new BehaviorSubject(defaultAccumulator)) {
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

function createSideEffectObservable(stateObservables = new Subject()) {
    const effects$ = merge(stateObservables.pipe(mergeAll(), observeOn(queueScheduler)));
    function nextEffectObservable(effect$) {
        stateObservables.next(effect$);
    }
    function subscribe() {
        return effects$.subscribe();
    }
    return {
        effects$,
        nextEffectObservable,
        subscribe
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
let RxState = class RxState {
    /**
     * @internal
     */
    constructor() {
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
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    setAccumulator(accumulatorFn) {
        this.accumulator.nextAccumulator(accumulatorFn);
    }
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
    get() {
        return this.accumulator.state;
    }
    /**
     * @internal
     */
    set(keyOrStateOrProjectState, stateOrSliceProjectFn) {
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
            const state = {};
            state[keyOrStateOrProjectState] = stateOrSliceProjectFn(this.accumulator.state);
            this.accumulator.nextSlice(state);
            return;
        }
        throw new Error('wrong params passed to set');
    }
    /**
     * @internal
     */
    connect(keyOrInputOrSlice$, projectOrSlices$, projectValueFn) {
        if (isObservable(keyOrInputOrSlice$) &&
            projectOrSlices$ === undefined &&
            projectValueFn === undefined) {
            const slice$ = keyOrInputOrSlice$.pipe(filter(slice => slice !== undefined));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (isObservable(keyOrInputOrSlice$) &&
            typeof projectOrSlices$ === 'function' &&
            !isObservable(projectOrSlices$) &&
            projectValueFn === undefined) {
            const project = projectOrSlices$;
            const slice$ = keyOrInputOrSlice$.pipe(filter(slice => slice !== undefined), map(v => project(this.get(), v)));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (isKeyOf(keyOrInputOrSlice$) &&
            isObservable(projectOrSlices$) &&
            projectValueFn === undefined) {
            const key = keyOrInputOrSlice$;
            const slice$ = projectOrSlices$.pipe(filter(slice => slice !== undefined), map(value => (Object.assign({}, { [key]: value }))));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (isKeyOf(keyOrInputOrSlice$) &&
            isObservable(projectOrSlices$) &&
            typeof projectValueFn === 'function') {
            const key = keyOrInputOrSlice$;
            const slice$ = projectOrSlices$.pipe(filter(slice => slice !== undefined), map(value => (Object.assign({}, { [key]: projectValueFn(this.get(), value) }))));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        throw new Error('wrong params passed to connect');
    }
    /**
     * @internal
     */
    select(...opOrMapFn) {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return this.accumulator.state$.pipe(stateful());
        }
        else if (isStringArrayGuard(opOrMapFn)) {
            return this.accumulator.state$.pipe(stateful(pluck(...opOrMapFn)));
        }
        else if (isOperateFnArrayGuard(opOrMapFn)) {
            return this.accumulator.state$.pipe(stateful(pipeFromArray(opOrMapFn)));
        }
        throw new Error('wrong params passed to select');
    }
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
    hold(obsOrObsWithSideEffect, sideEffectFn) {
        if (typeof sideEffectFn === 'function') {
            this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect.pipe(tap(sideEffectFn)));
            return;
        }
        this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
    }
    /**
     * @internal
     */
    subscribe() {
        const subscription = new Subscription();
        subscription.add(this.accumulator.subscribe());
        subscription.add(this.effectObservable.subscribe());
        return subscription;
    }
};
RxState.ɵfac = function RxState_Factory(t) { return new (t || RxState)(); };
RxState.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: RxState, factory: RxState.ɵfac });
RxState = __decorate([ __metadata("design:paramtypes", [])
], RxState);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RxState, [{
        type: Injectable
    }], function () { return []; }, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { RxState, distinctUntilSomeChanged, select, selectSlice, stateful };

//# sourceMappingURL=rx-angular-state.js.map