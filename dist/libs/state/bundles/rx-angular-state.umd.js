(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@rx-angular/state', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['rx-angular'] = global['rx-angular'] || {}, global['rx-angular'].state = {}), global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    function pipeFromArray(fns) {
        if (!fns) {
            return rxjs.noop;
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
            operators.distinctUntilChanged(), 
            // CUSTOM LOGIC HERE
            function (o) {
                if (isOperateFnArrayGuard(optionalDerive)) {
                    return o.pipe(pipeFromArray(optionalDerive));
                }
                return o;
            }, 
            // initial emissions, undefined is no base-state, pollution with skip(1)
            operators.filter(function (v) { return v !== undefined; }), 
            // distinct same derivation value
            operators.distinctUntilChanged(), 
            // reuse custom operations result for multiple subscribers and reemit the last calculated value.
            operators.shareReplay({ bufferSize: 1, refCount: true }));
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
                return state$.pipe(stateful(operators.pluck.apply(void 0, __spread(opOrMapFn))));
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
        return operators.distinctUntilChanged(function (oldV, newV) { return !distinctCompare(oldV, newV); });
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
            operators.map(function (state) { return ({
                definedKeys: keys.filter(function (k) { return state.hasOwnProperty(k) && state[k] !== undefined; }),
                state: state
            }); }), operators.filter(function (_a) {
                var definedKeys = _a.definedKeys, state = _a.state;
                return !!definedKeys.length;
            }), 
            // create view-model
            operators.map(function (_a) {
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
        if (stateObservables === void 0) { stateObservables = new rxjs.Subject(); }
        if (stateSlices === void 0) { stateSlices = new rxjs.Subject(); }
        if (accumulatorObservable === void 0) { accumulatorObservable = new rxjs.BehaviorSubject(defaultAccumulator); }
        var signal$ = rxjs.merge(stateObservables.pipe(operators.distinctUntilChanged(), operators.mergeAll(), operators.observeOn(rxjs.queueScheduler)), stateSlices.pipe(operators.observeOn(rxjs.queueScheduler))).pipe(operators.withLatestFrom(accumulatorObservable.pipe(operators.observeOn(rxjs.queueScheduler))), operators.scan(function (state, _a) {
            var _b = __read(_a, 2), slice = _b[0], stateAccumulator = _b[1];
            return stateAccumulator(state, slice);
        }, {}), operators.tap(function (newState) { return (compositionObservable.state = newState); }), operators.publish());
        var state$ = signal$.pipe(operators.publishReplay(1));
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
        if (stateObservables === void 0) { stateObservables = new rxjs.Subject(); }
        var effects$ = rxjs.merge(stateObservables.pipe(operators.mergeAll(), operators.observeOn(rxjs.queueScheduler)));
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
            this.subscription = new rxjs.Subscription();
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
            if (rxjs.isObservable(keyOrInputOrSlice$) &&
                projectOrSlices$ === undefined &&
                projectValueFn === undefined) {
                var slice$ = keyOrInputOrSlice$.pipe(operators.filter(function (slice) { return slice !== undefined; }));
                this.accumulator.nextSliceObservable(slice$);
                return;
            }
            if (rxjs.isObservable(keyOrInputOrSlice$) &&
                typeof projectOrSlices$ === 'function' &&
                !rxjs.isObservable(projectOrSlices$) &&
                projectValueFn === undefined) {
                var project_1 = projectOrSlices$;
                var slice$ = keyOrInputOrSlice$.pipe(operators.filter(function (slice) { return slice !== undefined; }), operators.map(function (v) { return project_1(_this.get(), v); }));
                this.accumulator.nextSliceObservable(slice$);
                return;
            }
            if (isKeyOf(keyOrInputOrSlice$) &&
                rxjs.isObservable(projectOrSlices$) &&
                projectValueFn === undefined) {
                var key_1 = keyOrInputOrSlice$;
                var slice$ = projectOrSlices$.pipe(operators.filter(function (slice) { return slice !== undefined; }), operators.map(function (value) {
                    var _a;
                    return (__assign({}, (_a = {}, _a[key_1] = value, _a)));
                }));
                this.accumulator.nextSliceObservable(slice$);
                return;
            }
            if (isKeyOf(keyOrInputOrSlice$) &&
                rxjs.isObservable(projectOrSlices$) &&
                typeof projectValueFn === 'function') {
                var key_2 = keyOrInputOrSlice$;
                var slice$ = projectOrSlices$.pipe(operators.filter(function (slice) { return slice !== undefined; }), operators.map(function (value) {
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
                return this.accumulator.state$.pipe(stateful(operators.pluck.apply(void 0, __spread(opOrMapFn))));
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
                this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect.pipe(operators.tap(sideEffectFn)));
                return;
            }
            this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
        };
        /**
         * @internal
         */
        RxState.prototype.subscribe = function () {
            var subscription = new rxjs.Subscription();
            subscription.add(this.accumulator.subscribe());
            subscription.add(this.effectObservable.subscribe());
            return subscription;
        };
        RxState = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], RxState);
        return RxState;
    }());

    exports.RxState = RxState;
    exports.distinctUntilSomeChanged = distinctUntilSomeChanged;
    exports.select = select;
    exports.selectSlice = selectSlice;
    exports.stateful = stateful;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=rx-angular-state.umd.js.map
