(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('util'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@rx-angular/template', ['exports', 'rxjs', 'rxjs/operators', 'util', '@angular/core'], factory) :
    (global = global || self, factory((global['rx-angular'] = global['rx-angular'] || {}, global['rx-angular'].template = {}), global.rxjs, global.rxjs.operators, global.util, global.ng.core));
}(this, (function (exports, rxjs, operators, util, core) { 'use strict';

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

    function toObservableValue(p) {
        // @ts-ignore
        return p == null ? rxjs.of(p) : rxjs.from(p);
    }

    function nameToStrategy(strategies) {
        return function (o$) {
            return o$.pipe(operators.distinctUntilChanged(), operators.map(function (strategy) {
                var s = strategies[strategy];
                if (!!s) {
                    return s;
                }
                throw new Error("Strategy " + strategy + " does not exist.");
            }));
        };
    }

    /**
     * RenderAware
     *
     * @description
     * This function returns an object that holds all the shared logic for the push pipe and the let directive
     * responsible for change detection
     * If you extend this class you need to implement how the update of the rendered value happens.
     * Also custom behaviour is something you need to implement in the extending class
     */
    function createRenderAware(cfg) {
        var strategyName$ = new rxjs.ReplaySubject(1);
        var strategy$ = strategyName$.pipe(operators.distinctUntilChanged(), operators.switchMap(function (stringOrObservable) {
            return typeof stringOrObservable === 'string'
                ? rxjs.of(stringOrObservable)
                : stringOrObservable;
        }), nameToStrategy(cfg.strategies));
        var observablesFromTemplate$ = new rxjs.ReplaySubject(1);
        var valuesFromTemplate$ = observablesFromTemplate$.pipe(operators.distinctUntilChanged());
        var firstTemplateObservableChange = true;
        var renderingEffect$ = valuesFromTemplate$.pipe(
        // handle null | undefined assignment and new Observable reset
        operators.map(function (observable$) {
            if (observable$ === null) {
                return rxjs.of(null);
            }
            if (!firstTemplateObservableChange) {
                cfg.resetObserver.next();
                if (observable$ === undefined) {
                    return rxjs.of(undefined);
                }
            }
            firstTemplateObservableChange = false;
            return observable$;
        }), 
        // forward only observable values
        operators.filter(function (o$) { return o$ !== undefined; }), operators.switchMap(function (o$) { return o$.pipe(operators.distinctUntilChanged(), operators.tap(cfg.updateObserver)); }), operators.withLatestFrom(strategy$), operators.tap(function (_a) {
            var _b = __read(_a, 2), v = _b[0], strat = _b[1];
            return strat.scheduleCD();
        }), operators.catchError(function (e) {
            console.error(e);
            return rxjs.EMPTY;
        }));
        return {
            nextPotentialObservable: function (value) {
                observablesFromTemplate$.next(value);
            },
            nextStrategy: function (nextConfig) {
                strategyName$.next(nextConfig);
            },
            activeStrategy$: strategy$,
            subscribe: function () {
                return new rxjs.Subscription()
                    .add(strategy$.subscribe())
                    .add(renderingEffect$.subscribe());
            }
        };
    }

    /**
     * @description
     *
     * A fallback for the new `globalThis` reference.
     *
     *  It should be used to replace `window` due to different environments in:
     *  - SSR (Server Side Rendering)
     *  - Tests
     *  - Browser
     *
     *  @return {globalThis} - A reference to globalThis. `window` in the Browser.
     */
    function getGlobalThis() {
        return (globalThis || self || window);
    }

    /*
     * createPropertiesWeakMap
     *
     * @param getDefaults: (o: O) => P
     * Example:
     *
     * export interface Properties {
     *   isCoalescing: boolean;
     * }
     *
     * const obj: object = {
     *   foo: 'bar',
     *   isCoalescing: 'weakMap version'
     * };
     *
     * const getDefaults = (ctx: object): Properties => ({isCoalescing: false});
     * const propsMap = createPropertiesWeakMap<object, Properties>(getDefaults);
     *
     * console.log('obj before:', obj);
     * // {foo: "bar", isCoalescing: "weakMap version"}
     * console.log('props before:', propsMap.getProps(obj));
     * // {isCoalescing: "weakMap version"}
     *
     * propsMap.setProps(obj, {isCoalescing: true});
     * console.log('obj after:', obj);
     * // {foo: "bar", isCoalescing: "weakMap version"}
     * console.log('props after:', propsMap.getProps(obj));
     * // {isCoalescing: "true"}
     * */
    function createPropertiesWeakMap(getDefaults) {
        var propertyMap = new WeakMap();
        return {
            getProps: getProperties,
            setProps: setProperties
        };
        function getProperties(ctx) {
            var defaults = getDefaults(ctx);
            var propertiesPresent = propertyMap.get(ctx);
            var properties;
            if (propertiesPresent !== undefined) {
                properties = propertiesPresent;
            }
            else {
                properties = {};
                Object.entries(defaults).forEach(function (_a) {
                    var _b = __read(_a, 2), prop = _b[0], value = _b[1];
                    properties[prop] = hasKey(ctx, prop) ? ctx[prop] : value;
                });
                propertyMap.set(ctx, properties);
            }
            return properties;
        }
        function setProperties(ctx, props) {
            var properties = getProperties(ctx);
            Object.entries(props).forEach(function (_a) {
                var _b = __read(_a, 2), prop = _b[0], value = _b[1];
                properties[prop] = value;
            });
            propertyMap.set(ctx, properties);
            return properties;
        }
        function hasKey(ctx, property) {
            return ctx[property] != null;
        }
    }

    /**
     * envZonePatched
     *
     * @description
     *
     * This function checks the window object `zone.js` was instantiated.
     * If so, the `window` object maintains a property named `Zone`.
     *
     * Here how Angular checks it: https://github.com/angular/angular/blob/master/packages/core/src/zone/ng_zone.ts#L123
     *
     * @return {boolean} - true if `zone.js` patched global APIs.
     *
     */
    function envZonePatched() {
        return getGlobalThis().Zone !== undefined;
    }
    /**
     * apiZonePatched
     *
     * @description
     *
     * This function checks if a specific Browser API is patched by `zone.js`.
     *
     * @param name {string} - The name of the API to check.
     * @return {boolean} - true if `zone.js` patched the API in question.
     *
     */
    function apiZonePatched(name) {
        // if symbol is present, zone patched the API
        return getGlobalThis()['__zone_symbol__' + name] !== undefined;
    }
    var zoneDetectionCache = new WeakMap();
    /**
     * isNgZone
     *
     * @description
     *
     * This function takes an instance of a class which implements the NgZone interface and checks if
     * its `runOutsideAngular()` function calls `apply()` on the function passed as parameter. This
     * means the Angular application that instantiated this service assumes it runs in a ZoneLess
     * environment, and therefore it's change detection will not be triggered by zone related logic.
     *
     * However, keep in mind this does not mean `zone.js` is not present.
     * The environment could still run in ZoneFull mode even if Angular turned it off.
     * Consider the situation of a Angular element configured for ZoneLess
     * environments is used in an Angular application relining on the zone mechanism.
     *
     * @param instance {Class Instance} - The instance to check for constructor name of `NgZone`.
     * @return {boolean} - true if instance is of type `NgZone`.
     *
     */
    function isNgZone(instance) {
        var cachedValue = zoneDetectionCache.get(instance);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        var calledApply = false;
        function fn() { }
        fn.apply = function () { return (calledApply = true); };
        instance.runOutsideAngular(fn);
        zoneDetectionCache.set(instance, calledApply);
        return calledApply;
    }
    /**
     * isNoopNgZone
     *
     *@description
     *
     * This function takes any instance of a class and checks
     * if the constructor name is equal to `NoopNgZone`.
     *
     * For more detailed information read the description of [isNgZone](#isngzone).
     *
     * @param instance {Class Instance} - The instance to check for constructor name of `NoopNgZone`.
     * @return {boolean} - true if instance is of type `NoopNgZone`.
     *
     */
    function isNoopNgZone(instance) {
        return !isNgZone(instance);
    }

    /** A shared promise instance to cause a delay of one microtask */
    var resolvedPromise = null;
    function getUnpatchedResolvedPromise() {
        resolvedPromise =
            resolvedPromise ||
                (apiZonePatched('Promise')
                    ? getGlobalThis().__zone_symbol__Promise.resolve()
                    : Promise.resolve());
        return resolvedPromise;
    }

    /**
     * envRunsIvy
     *
     * @description
     * Determines the used view engine of an Angular project is Ivy or not.
     * The check is done based on following table:
     * | render       | ViewEngine | ViewEngine | Ivy         | Ivy         |
     * | ------------ | ---------- | ---------- | ----------- | ----------- |
     * | **mode**     | prod       | dev        | prod        | dev         |
     * | **ng**       | present    | present    | `undefined` | present     |
     * | **ng.probe** | present    | present    | `undefined` | `undefined` |
     *
     *  So for Ivy we need to make sure that ng is undefined or,
     *  in case of dev environment, ng.probe is undefined.
     *
     * @return {boolean} - true if the used view engine is Ivy.
     *
     */
    function isViewEngineIvy() {
        var ng = getGlobalThis().ng;
        // Is the global ng object is unavailable?
        // ng === undefined in Ivy production mode
        // View Engine has the ng object both in development mode and production mode.
        return (ng === undefined ||
            // in case we are in dev mode in ivy
            // `probe` property is available on ng object we use View Engine.
            ng.probe === undefined);
    }

    /**
     * getZoneUnPatchedApi
     *
     * @description
     *
     * This function returns the zone un-patched API for the a specific Browser API.
     * If no element is passed the window is used instead
     *
     * @param name {string} - The name of the API to check.
     * @param elem {any} - The elem to get un-patched API from.
     * @return {Function} - The zone un-patched API in question.
     *
     */
    function getZoneUnPatchedApi(name, elem) {
        elem = elem || getGlobalThis();
        return apiZonePatched(name) ? elem['__zone_symbol__' + name] : elem[name];
    }
    /**
     *
     * @description
     *
     * This function takes an elem and event and re-applies the listeners from the passed event to the
     * passed element with the zone un-patched version of it.
     *
     * @param elem {HTMLElement} - The elem to re-apply the listeners to.
     * @param event {string} - The name of the event from which to re-apply the listeners.
     *
     * @returns void
     */
    function unpatchEventListener(elem, event) {
        var eventListeners = elem.eventListeners(event);
        // Return if no event listeners are present
        if (!eventListeners) {
            return;
        }
        var addEventListener = getZoneUnPatchedApi('addEventListener', elem).bind(elem);
        eventListeners.forEach(function (listener) {
            // Remove and reapply listeners with patched API
            elem.removeEventListener(event, listener);
            // Reapply listeners with un-patched API
            addEventListener(event, listener);
        });
    }

    var coalescingContextPropertiesMap = createPropertiesWeakMap(function (ctx) { return ({
        numCoalescingSubscribers: 0
    }); });
    function createCoalesceManager(scope) {
        if (scope === void 0) { scope = {}; }
        return {
            remove: removeSubscriber,
            add: addSubscription,
            isCoalescing: isCoalescing
        };
        // Increments the number of subscriptions in a scope e.g. a class instance
        function removeSubscriber() {
            var numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
                1;
            coalescingContextPropertiesMap.setProps(scope, {
                numCoalescingSubscribers: numCoalescingSubscribers
            });
        }
        // Decrements the number of subscriptions in a scope e.g. a class instance
        function addSubscription() {
            var numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
                1;
            coalescingContextPropertiesMap.setProps(scope, {
                numCoalescingSubscribers: numCoalescingSubscribers
            });
        }
        // Checks if anybody else is already coalescing atm
        function isCoalescing() {
            return (coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
                0);
        }
    }

    /**
     * @description
     * Limits the number of synchronous emitted a value from the source Observable to
     * one emitted value per
     *   [`AnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), then repeats
     *   this process for every tick of the browsers event loop.
     *
     * The coalesce operator is based on the [throttle](https://rxjs-dev.firebaseapp.com/api/operators/throttle) operator.
     * In addition to that is provides emitted values for the trailing end only, as well as maintaining a context to scope
     *   coalescing.
     *
     * @param {function(value: T): SubscribableOrPromise} durationSelector - A function
     * that receives a value from the source Observable, for computing the silencing
     * duration for each source value, returned as an Observable or a Promise.
     * It defaults to `requestAnimationFrame` as durationSelector.
     * @param {Object} config - A configuration object to define `leading` and `trailing` behavior and the context object.
     * Defaults to `{ leading: false, trailing: true }`. The default scoping is per subscriber.
     * @return {Observable<T>} An Observable that performs the coalesce operation to
     * limit the rate of emissions from the source.
     *
     * @usageNotes
     * Emit clicks at a rate of at most one click per second
     * ```ts
     * import { fromEvent, animationFrames } from 'rxjs';
     * import { coalesce } from 'ngRx/component';
     *
     * const clicks = fromEvent(document, 'click');
     * const result = clicks.pipe(coalesce(ev => animationFrames));
     * result.subscribe(x => console.log(x));
     * ```
     */
    function coalesceWith(durationSelector, scope) {
        var _scope = scope || {};
        return function (source) {
            var o$ = new rxjs.Observable(function (observer) {
                var rootSubscription = new rxjs.Subscription();
                rootSubscription.add(source.subscribe(createInnerObserver(observer, rootSubscription)));
                return rootSubscription;
            });
            return o$;
            function createInnerObserver(outerObserver, rootSubscription) {
                var actionSubscription;
                var latestValue;
                var coa = createCoalesceManager(_scope);
                var tryEmitLatestValue = function () {
                    coa.remove();
                    if (!coa.isCoalescing()) {
                        outerObserver.next(latestValue);
                    }
                };
                return {
                    complete: function () {
                        if (actionSubscription) {
                            tryEmitLatestValue();
                        }
                        outerObserver.complete();
                    },
                    error: function (error) { return outerObserver.error(error); },
                    next: function (value) {
                        latestValue = value;
                        if (!actionSubscription) {
                            coa.add();
                            actionSubscription = durationSelector.subscribe({
                                next: function () {
                                    tryEmitLatestValue();
                                    actionSubscription = undefined;
                                },
                                complete: function () {
                                    if (actionSubscription) {
                                        tryEmitLatestValue();
                                        actionSubscription = undefined;
                                    }
                                }
                            });
                            rootSubscription.add(actionSubscription);
                        }
                    }
                };
            }
        };
    }

    function renderChange(strategy) {
        return function (s) {
            return s.pipe(strategy.behavior, operators.tap(function (v) { return strategy.renderMethod(); }));
        };
    }

    var unpatchedAsapScheduler = {
        now: function () {
            return 0;
        },
        schedule: function (work, options, state) {
            return rxjs.from(getUnpatchedResolvedPromise()).subscribe(function () { return work(state); });
        }
    };

    /**
     *
     * Implementation based on rxjs-etc => IdleScheduler
     *
     */
    var PostTaskSchedulerPriority;
    (function (PostTaskSchedulerPriority) {
        PostTaskSchedulerPriority["background"] = "background";
        PostTaskSchedulerPriority["userBlocking"] = "user-blocking";
        PostTaskSchedulerPriority["userVisible"] = "user-visible";
    })(PostTaskSchedulerPriority || (PostTaskSchedulerPriority = {}));
    var postTaskScheduler = typeof window !== 'undefined'
        ? window.scheduler || {
            postTask: function (options) {
                var start = Date.now();
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        console.error('postTask not implemented. Use setTimeout as fallback');
                        resolve();
                    }, 1);
                });
            }
        }
        : function () { };
    var PostTaskAction = /** @class */ (function (_super) {
        __extends(PostTaskAction, _super);
        function PostTaskAction(work) {
            var _this = _super.call(this) || this;
            _this.work = work;
            return _this;
        }
        PostTaskAction.prototype.schedule = function (state, delay) {
            if (this.closed) {
                return this;
            }
            return this._scheduler.schedule(this.work, delay, state);
        };
        return PostTaskAction;
    }(rxjs.Subscription));
    function getPostTaskScheduler(priority) {
        return {
            now: function () {
                return rxjs.asyncScheduler.now();
            },
            schedule: function (work, options, state) {
                if (options === void 0) { options = {}; }
                if (util.isObject(options) && options.delay) {
                    return rxjs.asyncScheduler.schedule(work, options.delay, state);
                }
                options = __assign(__assign({}, options), { priority: priority });
                var action = new PostTaskAction(work);
                // weired hack
                action._scheduler = this;
                var promise = postTaskScheduler
                    .postTask(function () { }, options)
                    .then(function () {
                    try {
                        work.call(action, state);
                    }
                    catch (error) {
                        action.unsubscribe();
                        throw error;
                    }
                });
                action.add(function () {
                    throw new Error('not implemented');
                });
                return action;
            }
        };
    }

    var cancelIdleCallback = typeof window !== 'undefined'
        ? window.cancelIdleCallback ||
            function (idleId) {
                console.warn('Fake cancelIdleCallback used');
                clearTimeout(idleId);
            }
        : function () { };
    var requestIdleCallback = typeof window !== 'undefined'
        ? window.requestIdleCallback ||
            function (cb) {
                console.warn('Fake requestIdleCallback used');
                var start = Date.now();
                return setTimeout(function () {
                    cb({
                        didTimeout: false,
                        timeRemaining: function () {
                            return Math.max(0, 50 - (Date.now() - start));
                        }
                    });
                }, 1);
            }
        : function () { };
    var IdleAction = /** @class */ (function (_super) {
        __extends(IdleAction, _super);
        function IdleAction(work) {
            var _this = _super.call(this) || this;
            _this.work = work;
            return _this;
        }
        IdleAction.prototype.schedule = function (state, delay) {
            if (this.closed) {
                return this;
            }
            return idleScheduler.schedule(this.work, delay, state);
        };
        return IdleAction;
    }(rxjs.Subscription));
    var idleScheduler = {
        now: function () {
            return rxjs.asyncScheduler.now();
        },
        schedule: function (work, delay, state) {
            if (delay) {
                return rxjs.asyncScheduler.schedule(work, delay, state);
            }
            var action = new IdleAction(work);
            var id = requestIdleCallback(function () {
                try {
                    work.call(action, state);
                }
                catch (error) {
                    action.unsubscribe();
                    throw error;
                }
            });
            action.add(function () { return cancelIdleCallback(id); });
            return action;
        }
    };

    var animationFrameTick = new rxjs.Observable(function (subscriber) {
        var i = 0;
        var id = getZoneUnPatchedApi('requestAnimationFrame')(function () {
            subscriber.next(++i);
        });
        return function () {
            getZoneUnPatchedApi('cancelAnimationFrame')(id);
        };
    });
    var unpatchedAnimationFrameScheduler = {
        now: function () {
            return 0;
        },
        schedule: function (work, options, state) {
            return animationFrameTick.subscribe(function () { return work(state); });
        }
    };


    (function (SchedulingPriority) {
        SchedulingPriority["animationFrame"] = "animationFrame";
        SchedulingPriority["Promise"] = "Promise";
        SchedulingPriority["idleCallback"] = "idleCallback";
        SchedulingPriority["userBlocking"] = "userBlocking";
        SchedulingPriority["userVisible"] = "userVisible";
        SchedulingPriority["background"] = "background";
        SchedulingPriority["setInterval"] = "setInterval";
    })(exports.SchedulingPriority || (exports.SchedulingPriority = {}));

    var prioritySchedulerMap = {
        animationFrame: rxjs.animationFrameScheduler,
        Promise: rxjs.asapScheduler,
        setInterval: rxjs.asyncScheduler,
        idleCallback: idleScheduler,
        userBlocking: getPostTaskScheduler(PostTaskSchedulerPriority.userBlocking),
        userVisible: getPostTaskScheduler(PostTaskSchedulerPriority.userVisible),
        background: getPostTaskScheduler(PostTaskSchedulerPriority.background)
    };
    function getScheduler(priority) {
        if (!prioritySchedulerMap.hasOwnProperty(priority)) {
            throw new Error("priority " + priority + " is not present in prioritiesMap");
        }
        return prioritySchedulerMap[priority];
    }

    function staticCoalesce(work, durationSelector, scope) {
        if (scope === void 0) { scope = {}; }
        var coalescingManager = createCoalesceManager(scope);
        if (!coalescingManager.isCoalescing()) {
            coalescingManager.add();
            durationSelector.subscribe(function () {
                tryExecuteWork();
            });
        }
        // =====
        function tryExecuteWork() {
            coalescingManager.remove();
            if (!coalescingManager.isCoalescing()) {
                return work();
            }
        }
    }

    function schedule(work, priority) {
        return getScheduler(priority).schedule(function () { return work(); });
    }

    function coalesceAndSchedule(work, priority, scope) {
        if (scope === void 0) { scope = {}; }
        var durationSelector = rxjs.from(getUnpatchedResolvedPromise());
        var scheduledWork = function () { return schedule(work, priority); };
        staticCoalesce(scheduledWork, durationSelector, scope);
    }

    /**
     * Noop Strategy
     *
     * This strategy is does nothing. It serves for debugging only
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------ ------ | ---------------- |
     * | `noop`      | ❌/❌         | no rendering        | ❌               |
     *
     * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
     * @return {RenderStrategy<T>} - The calculated strategy
     *
     */
    function createNoopStrategy() {
        return {
            name: 'noop',
            renderMethod: function () { },
            behavior: function (o) { return o; },
            scheduleCD: function () { }
        };
    }

    /**
     * Native Strategy
     * @description
     *
     * This strategy mirrors Angular's built-in `async` pipe.
     * This means for every emitted value `ChangeDetectorRef#markForCheck` is called.
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------ ------ | ---------------- |
     * | `native`    | ❌/❌         | mFC / mFC           | ❌               |
     *
     * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
     * @return {RenderStrategy<T>} - The calculated strategy
     *
     */
    function createNativeStrategy(config) {
        return {
            name: 'native',
            renderMethod: config.cdRef.markForCheck,
            behavior: function (o) { return o; },
            scheduleCD: function () {
                config.cdRef.markForCheck();
            }
        };
    }

    /**
     * Strategies
     *
     * - VE/I - Options for ViewEngine / Ivy
     * - mFC - `cdRef.markForCheck`
     * - dC - `cdRef.detectChanges`
     * - ɵMD - `ɵmarkDirty`
     * - ɵDC - `ɵdetectChanges`
     * - LV  - `LView`
     * - C - `Component`
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------------- | ---------------- |
     * | `local`    | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
     * | `detach`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
     * | `postTask` | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
     * | `idleCallback` | ❌/✔ ️   | mFC  / ɵMD          | ❌               |
     *
     */
    function getLocalStrategies(config) {
        return {
            local: createLocalStrategy(config),
            localCoalesce: createLocalCoalesceStrategy(config),
            localCoalesceAndSchedule: createLocalCoalesceAndScheduleStrategy(config),
            localNative: createLocalNativeStrategy(config),
            detach: createDetachStrategy(config),
            userVisible: createUserVisibleStrategy(config),
            userBlocking: createUserBlockingStrategy(config),
            background: createBackgroundStrategy(config),
            idleCallback: createIdleCallbackStrategy(config)
        };
    }
    function createLocalNativeStrategy(config) {
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) { return o.pipe(); };
        var scheduleCD = function () { return renderMethod(); };
        return {
            name: 'localNative',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    /**
     *  Local Strategy
     *
     * This strategy is rendering the actual component and
     * all it's children that are on a path
     * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
     *
     * As detectChanges has no coalescing of render calls
     * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
     * component level.
     *
     * Coalescing, in this very manner,
     * means **collecting all events** in the same
     * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
     * execute **re-rendering only once**.
     *
     * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
     * E. g. the **component** from which the re-rendering was initiated.
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------ ------ | ---------------- |
     * | `ɵlocal`    | ✔️/✔️    | dC / dC             | ✔️ + C         |
     *
     * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
     * @return {RenderStrategy<T>} - The calculated strategy
     *
     */
    function createLocalStrategy(config) {
        var durationSelector = rxjs.from(getUnpatchedResolvedPromise());
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.animationFrame;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
        return {
            name: 'local',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    function createLocalCoalesceStrategy(config) {
        var durationSelector = rxjs.from(getUnpatchedResolvedPromise());
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.animationFrame;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
        return {
            name: 'localCoalesce',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    function createLocalCoalesceAndScheduleStrategy(config) {
        var durationSelector = rxjs.from(getUnpatchedResolvedPromise());
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.animationFrame;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
        return {
            name: 'localCoalesceAndSchedule',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    /**
     *  Detach Strategy
     *
     * This strategy is rendering the actual component and
     * all it's children that are on a path
     * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
     *
     * As detectChanges has no coalescing of render calls
     * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
     * component level.
     *
     * Coalescing, in this very manner,
     * means **collecting all events** in the same
     * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
     * execute **re-rendering only once**.
     *
     * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
     * E. g. the **component** from which the re-rendering was initiated.
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------ ------ | ---------------- |
     * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
     *
     * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
     * @return {RenderStrategy<T>} - The calculated strategy
     *
     */
    function createDetachStrategy(config) {
        var durationSelector = rxjs.from(getUnpatchedResolvedPromise());
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.animationFrame;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.reattach();
            config.cdRef.detectChanges();
            config.cdRef.detach();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
        return {
            name: 'detach',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    /**
     *  PostTask - Priority UserVisible Strategy
     *
     */
    function createUserVisibleStrategy(config) {
        var durationSelector = new rxjs.Observable(function (subscriber) {
            rxjs.from(postTaskScheduler.postTask(function () { return void 0; }, {
                priority: PostTaskSchedulerPriority.userVisible,
                delay: 0
            })).subscribe(subscriber);
        });
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.background;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
        return {
            name: 'userVisible',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    /**
     *  PostTask - Priority UserBlocking Strategy
     *
     */
    function createUserBlockingStrategy(config) {
        var durationSelector = new rxjs.Observable(function (subscriber) {
            rxjs.from(postTaskScheduler.postTask(function () { return void 0; }, {
                priority: PostTaskSchedulerPriority.userVisible,
                delay: 0
            })).subscribe(subscriber);
        });
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.background;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () {
            staticCoalesce(renderMethod, durationSelector, scope);
            // coalesceAndSchedule(renderMethod, priority, scope);
        };
        return {
            name: 'userBlocking',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    /**
     *  PostTask - Priority Background Strategy
     *
     */
    function createBackgroundStrategy(config) {
        var durationSelector = new rxjs.Observable(function (subscriber) {
            rxjs.from(postTaskScheduler.postTask(function () { return void 0; }, {
                priority: PostTaskSchedulerPriority.userVisible,
                delay: 0
            })).subscribe(subscriber);
        });
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.background;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () {
            staticCoalesce(renderMethod, durationSelector, scope);
            // coalesceAndSchedule(renderMethod, priority, scope);
        };
        return {
            name: 'background',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }
    /**
     *  IdleCallback Strategy
     *
     * This strategy is rendering the actual component and
     * all it's children that are on a path
     * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
     *
     * As detectChanges is used the coalescing described in `ɵlocal` is implemented here.
     *
     * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
     * E. g. the **component** from which the re-rendering was initiated.
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------ ------ | ---------------- |
     * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
     *
     * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
     * @return {RenderStrategy<T>} - The calculated strategy
     *
     */
    function createIdleCallbackStrategy(config) {
        var durationSelector = rxjs.from(getUnpatchedResolvedPromise());
        var scope = config.cdRef.context;
        var priority = exports.SchedulingPriority.idleCallback;
        var scheduler = getScheduler(priority);
        var renderMethod = function () {
            config.cdRef.detectChanges();
        };
        var behavior = function (o) {
            return o.pipe(coalesceWith(durationSelector, scope), operators.observeOn(scheduler));
        };
        var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
        return {
            name: 'idleCallback',
            renderMethod: renderMethod,
            behavior: behavior,
            scheduleCD: scheduleCD
        };
    }

    function getGlobalStrategies(config) {
        return {
            global: createGlobalStrategy(config)
        };
    }
    /**
     * Strategies
     *
     * - VE/I - Options for ViewEngine / Ivy
     * - mFC - `cdRef.markForCheck`
     * - dC - `cdRef.detectChanges`
     * - ɵMD - `ɵmarkDirty`
     * - ɵDC - `ɵdetectChanges`
     * - LV  - `LView`
     * - C - `Component`
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------------- | ---------------- |
     * | `global`   | ❌/✔ ️        | mFC  / ɵMD          | ❌               |
     *
     */
    /**
     *
     * Global Strategy
     *
     * This strategy is rendering the application root and
     * all it's children that are on a path
     * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing       |
     * |-------------| --------------| ------------ ------ | ---------------- |
     * | `global`   | ❌/✔️       | mFC / ɵMD           | ❌                |
     *
     * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
     * @return {RenderStrategy<T>} - The calculated strategy
     *
     */
    function createGlobalStrategy(config) {
        var renderMethod = function () { return core.ɵmarkDirty(config.cdRef.context); };
        return {
            name: 'global',
            renderMethod: renderMethod,
            behavior: function (o) { return o; },
            scheduleCD: function () { return renderMethod(); }
        };
    }

    var DEFAULT_STRATEGY_NAME = 'local';
    function getStrategies(config) {
        return __assign(__assign({ noop: createNoopStrategy(), native: createNativeStrategy(config) }, getGlobalStrategies(config)), getLocalStrategies(config));
    }
    /**
     * Strategies
     *
     * - VE/I - Options for ViewEngine / Ivy
     * - mFC - `cdRef.markForCheck`
     * - dC - `cdRef.detectChanges`
     * - ɵMD - `ɵmarkDirty`
     * - ɵDC - `ɵdetectChanges`
     * - LV  - `LView`
     * - C - `Component`
     *
     * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
     * |-------------| --------------| ------------------- | ---------------- |
     * | `noop`      | ❌/❌          | no rendering        | ❌               |
     * | `native`    | ❌/❌          | mFC / mFC           | ❌               |
     * | `global`    | ❌/✔ ️       | mFC  / ɵMD           | ❌               |
     * | `local`     | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
     * | `ɵglobal`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
     * | `ɵlocal`    | ✔/✔ ️       | dC / ɵDC             | ✔ ️ + C/ LV     |
     * | `ɵdetach`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
     *
     */

    /**
     * @Pipe PushPipe
     *
     * @description
     *
     * The `push` pipe serves as a drop-in replacement for the `async` pipe.
     * It contains intelligent handling of change detection to enable us
     * running in zone-full as well as zone-less mode without any changes to the code.
     *
     * The current way of binding an observable to the view looks like that:
     *  ```html
     *  {{observable$ | async}}
     * <ng-container *ngIf="observable$ | async as o">{{o}}</ng-container>
     * <component [value]="observable$ | async"></component>
     * ```
     *
     * The problem is `async` pipe just marks the component and all its ancestors as dirty.
     * It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
     *     components.
     *
     * Heavy dynamic and interactive UIs suffer from zones change detection a lot and can
     * lean to bad performance or even unusable applications, but the `async` pipe does not work in zone-less mode.
     *
     * `push` pipe solves that problem.
     *
     * Included Features:
     *  - Take observables or promises, retrieve their values and render the value to the template
     *  - Handling null and undefined values in a clean unified/structured way
     *  - Triggers change-detection differently if `zone.js` is present or not (`detectChanges` or `markForCheck`)
     *  - Distinct same values in a row to increase performance
     *  - Coalescing of change detection calls to boost performance
     *
     * @usageNotes
     *
     * `push` pipe solves that problem. It can be used like shown here:
     * ```html
     * {{observable$ | push}}
     * <ng-container *ngIf="observable$ | push as o">{{o}}</ng-container>
     * <component [value]="observable$ | push"></component>
     * ```
     *
     * @publicApi
     */
    var PushPipe = /** @class */ (function () {
        function PushPipe(cdRef) {
            var _this = this;
            this.resetObserver = {
                next: function () {
                    _this.renderedValue = undefined;
                }
            };
            this.updateObserver = {
                next: function (value) { return (_this.renderedValue = value); }
            };
            this.RenderAware = createRenderAware({
                strategies: getStrategies({ cdRef: cdRef }),
                updateObserver: this.updateObserver,
                resetObserver: this.resetObserver
            });
            this.subscription = this.RenderAware.subscribe();
        }
        PushPipe.prototype.transform = function (potentialObservable, config) {
            var strategy = config || DEFAULT_STRATEGY_NAME;
            this.RenderAware.nextStrategy(strategy);
            this.RenderAware.nextPotentialObservable(potentialObservable);
            return this.renderedValue;
        };
        PushPipe.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        PushPipe.ɵfac = function PushPipe_Factory(t) { return new (t || PushPipe)(core.ɵɵinjectPipeChangeDetectorRef()); };
        PushPipe.ɵpipe = core.ɵɵdefinePipe({ name: "push", type: PushPipe, pure: false });
        return PushPipe;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(PushPipe, [{
            type: core.Pipe,
            args: [{ name: 'push', pure: false }]
        }], function () { return [{ type: core.ChangeDetectorRef }]; }, null); })();

    var DECLARATIONS = [PushPipe];
    var PushModule = /** @class */ (function () {
        function PushModule() {
        }
        PushModule.ɵmod = core.ɵɵdefineNgModule({ type: PushModule });
        PushModule.ɵinj = core.ɵɵdefineInjector({ factory: function PushModule_Factory(t) { return new (t || PushModule)(); }, imports: [[]] });
        return PushModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(PushModule, { declarations: [PushPipe], exports: [PushPipe] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(PushModule, [{
            type: core.NgModule,
            args: [{
                    declarations: DECLARATIONS,
                    imports: [],
                    exports: DECLARATIONS
                }]
        }], null, null); })();

    /**
     * @Directive LetDirective
     *
     * @description
     *
     * The `*rxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
     * It also helps with several internal processing under the hood.
     *
     * The current way of binding an observable to the view looks like that:
     * ```html
     * <ng-container *ngIf="observableNumber$ as n">
     * <app-number [number]="n">
     * </app-number>
     * <app-number-special [number]="n">
     * </app-number-special>
     * </ng-container>
     *  ```
     *
     *  The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden
     *
     * Included Features:
     * - binding is always present. (`*ngIf="truthy$"`)
     * - it takes away the multiple usages of the `async` or `push` pipe
     * - a unified/structured way of handling null and undefined
     * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
     *   `ChangeDetectorRef.markForCheck`)
     * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
     *   `ɵdetectChanges`)
     * - distinct same values in a row (distinctUntilChanged operator),
     *
     * @usageNotes
     *
     * The `*rxLet` directive take over several things and makes it more convenient and save to work with streams in the
     *   template
     * `<ng-container *rxLet="observableNumber$ as c"></ng-container>`
     *
     * ```html
     * <ng-container *rxLet="observableNumber$ as n">
     * <app-number [number]="n">
     * </app-number>
     * </ng-container>
     *
     * <ng-container *rxLet="observableNumber$; let n">
     * <app-number [number]="n">
     * </app-number>
     * </ng-container>
     * ```
     *
     * In addition to that it provides us information from the whole observable context.
     * We can track the observables:
     * - next value
     * - error value
     * - complete base-state
     *
     * ```html
     * <ng-container *rxLet="observableNumber$; let n; let e = $error, let c = $complete">
     * <app-number [number]="n"  *ngIf="!e && !c">
     * </app-number>
     * <ng-container *ngIf="e">
     * There is an error: {{e}}
     * </ng-container>
     * <ng-container *ngIf="c">
     * Observable completed: {{c}}
     * </ng-container>
     * </ng-container>
     * ```
     *
     * @publicApi
     */
    var LetDirective = /** @class */ (function () {
        function LetDirective(cdRef, templateRef, viewContainerRef) {
            var _this = this;
            this.templateRef = templateRef;
            this.viewContainerRef = viewContainerRef;
            this.ViewContext = {
                $implicit: undefined,
                rxLet: undefined,
                $error: false,
                $complete: false
            };
            this.resetObserver = {
                next: function () {
                    // if not initialized no need to set undefined
                    if (_this.embeddedView) {
                        _this.ViewContext.$implicit = undefined;
                        _this.ViewContext.rxLet = undefined;
                        _this.ViewContext.$error = false;
                        _this.ViewContext.$complete = false;
                    }
                }
            };
            this.updateObserver = {
                next: function (value) {
                    // to have initial rendering lazy
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$implicit = value;
                    _this.ViewContext.rxLet = value;
                },
                error: function (error) {
                    // to have initial rendering lazy
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$error = true;
                },
                complete: function () {
                    // to have initial rendering lazy
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$complete = true;
                }
            };
            this.strategies = getStrategies({ cdRef: cdRef });
            this.renderAware = createRenderAware({
                strategies: this.strategies,
                resetObserver: this.resetObserver,
                updateObserver: this.updateObserver
            });
            this.renderAware.nextStrategy(DEFAULT_STRATEGY_NAME);
        }
        Object.defineProperty(LetDirective.prototype, "rxLet", {
            set: function (potentialObservable) {
                this.renderAware.nextPotentialObservable(potentialObservable);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LetDirective.prototype, "strategy", {
            set: function (strategy) {
                this.renderAware.nextStrategy(strategy || DEFAULT_STRATEGY_NAME);
            },
            enumerable: true,
            configurable: true
        });
        LetDirective.ngTemplateContextGuard = function (dir, ctx) {
            return true;
        };
        LetDirective.prototype.ngOnInit = function () {
            this.subscription = this.renderAware.subscribe();
        };
        LetDirective.prototype.createEmbeddedView = function () {
            this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef, this.ViewContext);
        };
        LetDirective.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
            this.viewContainerRef.clear();
        };
        LetDirective.ɵfac = function LetDirective_Factory(t) { return new (t || LetDirective)(core.ɵɵdirectiveInject(core.ChangeDetectorRef), core.ɵɵdirectiveInject(core.TemplateRef), core.ɵɵdirectiveInject(core.ViewContainerRef)); };
        LetDirective.ɵdir = core.ɵɵdefineDirective({ type: LetDirective, selectors: [["", "rxLet", ""]], inputs: { rxLet: "rxLet", strategy: ["rxLetStrategy", "strategy"] } });
        return LetDirective;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(LetDirective, [{
            type: core.Directive,
            args: [{ selector: '[rxLet]' }]
        }], function () { return [{ type: core.ChangeDetectorRef }, { type: core.TemplateRef }, { type: core.ViewContainerRef }]; }, { rxLet: [{
                type: core.Input
            }], strategy: [{
                type: core.Input,
                args: ['rxLetStrategy']
            }] }); })();

    var EXPORTED_DECLARATIONS = [LetDirective];
    var LetModule = /** @class */ (function () {
        function LetModule() {
        }
        LetModule.ɵmod = core.ɵɵdefineNgModule({ type: LetModule });
        LetModule.ɵinj = core.ɵɵdefineInjector({ factory: function LetModule_Factory(t) { return new (t || LetModule)(); } });
        return LetModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(LetModule, { declarations: [LetDirective], exports: [LetDirective] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(LetModule, [{
            type: core.NgModule,
            args: [{
                    declarations: EXPORTED_DECLARATIONS,
                    exports: [EXPORTED_DECLARATIONS]
                }]
        }], null, null); })();

    var zonePatchedEvents = [
        'scroll',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'load',
        'pointerup',
        'change',
        'blur',
        'focus',
        'click',
        'contextmenu',
        'drag',
        'dragend',
        'dragenter',
        'dragleave',
        'dragover',
        'dragstart',
        'drop',
        'input'
    ];

    /**
     * @Directive UnpatchEventsDirective
     *
     * @description
     *
     * The `unpatch` directive helps in partially migrating to zone-less apps as well as getting rid
     * of unnecessary renderings through zones `addEventListener` patches.
     * It can be used on any element you apply event bindings.
     *
     * The current way of binding events to the DOM is to use output bindings:
     *  ```html
     * <button (click)="doStuff($event)">click me</button>
     * ```
     *
     * The problem is that every event registered over `()` syntax, e.g. `(click)`
     * marks the component and all its ancestors as dirty and re-renders the whole component tree.
     * This is because zone.js patches the native browser API and whenever one of the patched APIs is used it re-renders.
     *
     * So even if your button is not related to a change that needs a re-render the app will re-render completely.
     * This leads to bad performance. This is especially helpful if you work with frequently fired events like 'mousemove'
     *
     * `unpatch` directive solves that problem.
     *
     * Included Features:
     *  - by default un-patch all registered listeners of the host it is applied on
     *  - un-patch only a specified set of registered event listeners
     *  - works zone independent (it directly checks the widow for patched APIs and un-patches them without the use of `runOutsideZone` which brings more performance)
     *  - Not interfering with any logic executed by the registered callback
     *
     * @usageNotes
     *
     * The `unpatch` directive can be used like shown here:
     * ```html
     * <button [unoatch] (click)="triggerSomeMethod($event)">click me</button>
     * <button [unoatch]="['mousemove']" (mousemove)="doStuff2($event)" (click)="doStuff($event)">click me</button>
     * ```
     *
     * @publicApi
     */
    // tslint:disable-next-line:directive-selector
    var UnpatchEventsDirective = /** @class */ (function () {
        function UnpatchEventsDirective(el) {
            this.el = el;
            this.subscription = new rxjs.Subscription();
            this.events$ = new rxjs.BehaviorSubject(zonePatchedEvents);
        }
        Object.defineProperty(UnpatchEventsDirective.prototype, "events", {
            set: function (value) {
                if (value && value.length > 0) {
                    this.events$.next(value);
                }
                else {
                    this.events$.next(zonePatchedEvents);
                }
            },
            enumerable: true,
            configurable: true
        });
        UnpatchEventsDirective.prototype.reapplyEventListenersZoneUnPatched = function (events) {
            var _this = this;
            events.forEach(function (ev) {
                unpatchEventListener(_this.el.nativeElement, ev);
            });
        };
        UnpatchEventsDirective.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        UnpatchEventsDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.subscription = this.events$
                .pipe(operators.tap(function (eventList) { return _this.reapplyEventListenersZoneUnPatched(eventList); }))
                .subscribe();
        };
        UnpatchEventsDirective.ɵfac = function UnpatchEventsDirective_Factory(t) { return new (t || UnpatchEventsDirective)(core.ɵɵdirectiveInject(core.ElementRef)); };
        UnpatchEventsDirective.ɵdir = core.ɵɵdefineDirective({ type: UnpatchEventsDirective, selectors: [["", "unpatch", ""]], inputs: { events: ["unpatch", "events"] } });
        return UnpatchEventsDirective;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(UnpatchEventsDirective, [{
            type: core.Directive,
            args: [{ selector: '[unpatch]' }]
        }], function () { return [{ type: core.ElementRef }]; }, { events: [{
                type: core.Input,
                args: ['unpatch']
            }] }); })();

    var DECLARATIONS$1 = [UnpatchEventsDirective];
    var UnpatchEventsModule = /** @class */ (function () {
        function UnpatchEventsModule() {
        }
        UnpatchEventsModule.ɵmod = core.ɵɵdefineNgModule({ type: UnpatchEventsModule });
        UnpatchEventsModule.ɵinj = core.ɵɵdefineInjector({ factory: function UnpatchEventsModule_Factory(t) { return new (t || UnpatchEventsModule)(); } });
        return UnpatchEventsModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(UnpatchEventsModule, { declarations: [UnpatchEventsDirective], exports: [UnpatchEventsDirective] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(UnpatchEventsModule, [{
            type: core.NgModule,
            args: [{
                    declarations: DECLARATIONS$1,
                    exports: DECLARATIONS$1
                }]
        }], null, null); })();

    var TemplateModule = /** @class */ (function () {
        function TemplateModule() {
        }
        TemplateModule.ɵmod = core.ɵɵdefineNgModule({ type: TemplateModule });
        TemplateModule.ɵinj = core.ɵɵdefineInjector({ factory: function TemplateModule_Factory(t) { return new (t || TemplateModule)(); }, imports: [LetModule, PushModule, UnpatchEventsModule] });
        return TemplateModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(TemplateModule, { exports: [LetModule, PushModule, UnpatchEventsModule] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(TemplateModule, [{
            type: core.NgModule,
            args: [{
                    exports: [LetModule, PushModule, UnpatchEventsModule]
                }]
        }], null, null); })();

    exports.LetDirective = LetDirective;
    exports.LetModule = LetModule;
    exports.PushModule = PushModule;
    exports.PushPipe = PushPipe;
    exports.TemplateModule = TemplateModule;
    exports.UnpatchEventsDirective = UnpatchEventsDirective;
    exports.UnpatchEventsModule = UnpatchEventsModule;
    exports.apiZonePatched = apiZonePatched;
    exports.coalesceAndSchedule = coalesceAndSchedule;
    exports.coalesceWith = coalesceWith;
    exports.createCoalesceManager = createCoalesceManager;
    exports.createPropertiesWeakMap = createPropertiesWeakMap;
    exports.createRenderAware = createRenderAware;
    exports.envZonePatched = envZonePatched;
    exports.getGlobalThis = getGlobalThis;
    exports.getPostTaskScheduler = getPostTaskScheduler;
    exports.getScheduler = getScheduler;
    exports.getStrategies = getStrategies;
    exports.getUnpatchedResolvedPromise = getUnpatchedResolvedPromise;
    exports.getZoneUnPatchedApi = getZoneUnPatchedApi;
    exports.idleScheduler = idleScheduler;
    exports.isNgZone = isNgZone;
    exports.isNoopNgZone = isNoopNgZone;
    exports.isViewEngineIvy = isViewEngineIvy;
    exports.nameToStrategy = nameToStrategy;
    exports.prioritySchedulerMap = prioritySchedulerMap;
    exports.renderChange = renderChange;
    exports.schedule = schedule;
    exports.staticCoalesce = staticCoalesce;
    exports.toObservableValue = toObservableValue;
    exports.unpatchEventListener = unpatchEventListener;
    exports.unpatchedAnimationFrameScheduler = unpatchedAnimationFrameScheduler;
    exports.unpatchedAsapScheduler = unpatchedAsapScheduler;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=rx-angular-template.umd.js.map
