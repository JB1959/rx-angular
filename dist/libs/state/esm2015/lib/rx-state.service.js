import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { isObservable, Subscription } from 'rxjs';
import { createAccumulationObservable, createSideEffectObservable, isOperateFnArrayGuard, isStringArrayGuard, pipeFromArray, stateful, isKeyOf } from './core';
import { filter, map, pluck, tap } from 'rxjs/operators';
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
RxState = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], RxState);
export { RxState };
//# sourceMappingURL=rx-state.service.js.map