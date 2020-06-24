"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var core_2 = require("./core");
var operators_1 = require("rxjs/operators");
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
        this.subscription = new rxjs_1.Subscription();
        this.accumulator = core_2.createAccumulationObservable();
        this.effectObservable = core_2.createSideEffectObservable();
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
        if (core_2.isKeyOf(keyOrStateOrProjectState) &&
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
        if (rxjs_1.isObservable(keyOrInputOrSlice$) &&
            projectOrSlices$ === undefined &&
            projectValueFn === undefined) {
            var slice$ = keyOrInputOrSlice$.pipe(operators_1.filter(function (slice) { return slice !== undefined; }));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (rxjs_1.isObservable(keyOrInputOrSlice$) &&
            typeof projectOrSlices$ === 'function' &&
            !rxjs_1.isObservable(projectOrSlices$) &&
            projectValueFn === undefined) {
            var project_1 = projectOrSlices$;
            var slice$ = keyOrInputOrSlice$.pipe(operators_1.filter(function (slice) { return slice !== undefined; }), operators_1.map(function (v) { return project_1(_this.get(), v); }));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (core_2.isKeyOf(keyOrInputOrSlice$) &&
            rxjs_1.isObservable(projectOrSlices$) &&
            projectValueFn === undefined) {
            var key_1 = keyOrInputOrSlice$;
            var slice$ = projectOrSlices$.pipe(operators_1.filter(function (slice) { return slice !== undefined; }), operators_1.map(function (value) {
                var _a;
                return (tslib_1.__assign({}, (_a = {}, _a[key_1] = value, _a)));
            }));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (core_2.isKeyOf(keyOrInputOrSlice$) &&
            rxjs_1.isObservable(projectOrSlices$) &&
            typeof projectValueFn === 'function') {
            var key_2 = keyOrInputOrSlice$;
            var slice$ = projectOrSlices$.pipe(operators_1.filter(function (slice) { return slice !== undefined; }), operators_1.map(function (value) {
                var _a;
                return (tslib_1.__assign({}, (_a = {}, _a[key_2] = projectValueFn(_this.get(), value), _a)));
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
            return this.accumulator.state$.pipe(core_2.stateful());
        }
        else if (core_2.isStringArrayGuard(opOrMapFn)) {
            return this.accumulator.state$.pipe(core_2.stateful(operators_1.pluck.apply(void 0, tslib_1.__spread(opOrMapFn))));
        }
        else if (core_2.isOperateFnArrayGuard(opOrMapFn)) {
            return this.accumulator.state$.pipe(core_2.stateful(core_2.pipeFromArray(opOrMapFn)));
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
            this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect.pipe(operators_1.tap(sideEffectFn)));
            return;
        }
        this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
    };
    /**
     * @internal
     */
    RxState.prototype.subscribe = function () {
        var subscription = new rxjs_1.Subscription();
        subscription.add(this.accumulator.subscribe());
        subscription.add(this.effectObservable.subscribe());
        return subscription;
    };
    RxState = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], RxState);
    return RxState;
}());
exports.RxState = RxState;
//# sourceMappingURL=rx-state.service.js.map