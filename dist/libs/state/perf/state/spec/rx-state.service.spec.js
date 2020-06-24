"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var testing_1 = require("@angular/core/testing");
var src_1 = require("../src");
var fixtures_1 = require("./fixtures");
var testing_2 = require("rxjs/testing");
var _test_helpers_1 = require("@test-helpers");
var select_1 = require("../src/lib/rxjs/operators/select");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
function setupState(cfg) {
    var initialState = tslib_1.__assign({}, cfg).initialState;
    var state = new src_1.RxState();
    if (initialState) {
        state.set(initialState);
    }
    return state;
}
var stateChecker = fixtures_1.createStateChecker(function (actual, expected) {
    if (typeof expected === 'object') {
        expect(actual).toEqual(expected);
    }
    else {
        expect(actual).toBe(expected);
    }
});
var testScheduler;
beforeEach(function () {
    testScheduler = new testing_2.TestScheduler(_test_helpers_1.jestMatcher);
});
describe('RxStateService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = setupState({});
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
    it('should be hot on instantiation', function () {
        stateChecker.checkSubscriptions(service, 1);
    });
    it('should unsubscribe on ngOnDestroy call', function () {
        stateChecker.checkSubscriptions(service, 1);
        service.ngOnDestroy();
        stateChecker.checkSubscriptions(service, 0);
    });
    describe('State', function () {
        it('should create new instance', function () {
            var state = new src_1.RxState();
            expect(state).toBeDefined();
        });
    });
    describe('$', function () {
        it('should return NO empty state after init when subscribing late', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupState({});
                expectObservable(state.$).toBe('');
            });
        });
        it('should return No changes when subscribing late', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = new src_1.RxState();
                state.subscribe();
                state.set({ num: 42 });
                expectObservable(state.$.pipe(operators_1.pluck('num'))).toBe('');
            });
        });
        it('should return new changes', function () {
            var state = new src_1.RxState();
            state.subscribe();
            state.set({ num: 42 });
            var slice$ = state.$.pipe(select_1.select('num'));
            var i = -1;
            var valuesInOrder = ['', { num: 777 }];
            slice$.subscribe(function (next) { return expect(next).toBe(valuesInOrder[++i]); });
            state.set({ num: 777 });
        });
    });
    describe('stateful with select', function () {
        it('should return empty state after init when subscribing late', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupState({});
                expectObservable(state.select()).toBe('');
            });
        });
        it('should return changes when subscribing late', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = new src_1.RxState();
                state.subscribe();
                state.set({ num: 42 });
                expectObservable(state.select('num')).toBe('n', { n: 42 });
            });
        });
        it('should return new changes', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = new src_1.RxState();
                state.subscribe();
                state.set({ num: 42 });
                var slice$ = state.select('num');
                var i = -1;
                var valuesInOrder = [{ num: 42 }, { num: 777 }];
                slice$.subscribe(function (next) { return expect(next).toBe(valuesInOrder[++i]); });
                state.set({ num: 777 });
            });
        });
    });
    describe('select', function () {
        it('should return initial state', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                expectObservable(state.select()).toBe('s', {
                    s: fixtures_1.initialPrimitiveState
                });
            });
        });
        it('should throw with wrong params', function () {
            var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
            expect(function () { return state.select(true); }).toThrowError('wrong params passed to select');
        });
        describe('slice by key', function () {
            it('should return empty state after init', function () {
                testScheduler.run(function (_a) {
                    var expectObservable = _a.expectObservable;
                    var state = setupState({});
                    expectObservable(state.select()).toBe('');
                });
            });
            it('should return initial state', function () {
                testScheduler.run(function (_a) {
                    var expectObservable = _a.expectObservable;
                    var state = new src_1.RxState();
                    state.subscribe();
                    state.set({ num: 42 });
                    expectObservable(state.select('num')).toBe('s', { s: 42 });
                });
            });
        });
        describe('slice by map function', function () {
            it('should return nothing if empty', function () {
                testScheduler.run(function (_a) {
                    var expectObservable = _a.expectObservable;
                    var state = setupState({});
                    expectObservable(state.select()).toBe('');
                });
            });
            it('should return full state object on select', function () {
                testScheduler.run(function (_a) {
                    var expectObservable = _a.expectObservable;
                    var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                    expectObservable(state.select()).toBe('s', {
                        s: fixtures_1.initialPrimitiveState
                    });
                });
            });
            it('should return slice on select with prop', function () {
                testScheduler.run(function (_a) {
                    var expectObservable = _a.expectObservable;
                    var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                    expectObservable(state.select('num')).toBe('s', {
                        s: fixtures_1.initialPrimitiveState.num
                    });
                });
            });
            it('should return slice on select with operator', function () {
                testScheduler.run(function (_a) {
                    var expectObservable = _a.expectObservable;
                    var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                    expectObservable(state.select(operators_1.map(function (s) { return s.num; }))).toBe('s', {
                        s: fixtures_1.initialPrimitiveState.num
                    });
                });
            });
        });
    });
    describe('set', function () {
        describe('with state partial', function () {
            it('should add new slices', function () {
                var state = setupState({});
                state.select().subscribe(function (s) {
                    throw Error('should never emit');
                });
                state.set(fixtures_1.initialPrimitiveState);
                state.select().subscribe(function (s) { return expect(s).toBe(fixtures_1.initialPrimitiveState); });
            });
            it('should override previous state slices', function () {
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                state.select().subscribe(function (s) {
                    throw Error('should never emit');
                });
                state.set(fixtures_1.initialPrimitiveState);
                state.select().subscribe(function (s) { return expect(s).toBe(fixtures_1.initialPrimitiveState); });
                state.set({ num: 1 });
                state.select().subscribe(function (s) { return expect(s).toBe({ num: 1 }); });
            });
            it('should throw with wrong params', function () {
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                expect(function () { return state.set('wrong params passed to set'); }).toThrowError('wrong param');
            });
        });
        describe('with state project partial', function () {
            it('should add new slices', function () {
                var state = setupState({});
                state.select().subscribe(function (s) {
                    throw Error('should never emit');
                });
                state.set(function (s) { return fixtures_1.initialPrimitiveState; });
                state.select().subscribe(function (s) { return expect(s).toBe(fixtures_1.initialPrimitiveState); });
            });
            it('should override previous state slices', function () {
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                state
                    .select()
                    .subscribe(function (s) { return expect(state).toBe(fixtures_1.initialPrimitiveState); });
                state.set(function (s) { return ({ num: s.num + 1 }); });
                state.select().subscribe(function (s) { return expect(state).toBe({ num: 43 }); });
            });
        });
        describe('with state key and value partial', function () {
            it('should add new slices', function () {
                var state = setupState({});
                state.select().subscribe(function (s) {
                    // throw Error('should never emit');
                });
                state.set('num', function (s) { return 1; });
                state.select().subscribe(function (s) { return expect(s).toBe(fixtures_1.initialPrimitiveState); });
            });
            it('should override previous state slices', function () {
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                state.select().subscribe(function (s) { return expect(s).toBe(fixtures_1.initialPrimitiveState); });
                state.set('num', function (s) { return s.num + 1; });
                state.select().subscribe(function (s) { return expect(s).toBe({ num: 43 }); });
            });
        });
    });
    describe('connect', function () {
        it('should work with observables directly', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                expectObservable(state.select('num')).toBe('(abc)', {
                    a: 42,
                    b: 43,
                    c: 44
                });
                state.connect(rxjs_1.from([{ num: 42 }, { num: 43 }, { num: 44 }]));
            });
        });
        it('should work with prop name and observable', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                expectObservable(state.select('num')).toBe('(abc)', {
                    a: 42,
                    b: 43,
                    c: 44
                });
                state.connect('num', rxjs_1.from([{ num: 42 }, { num: 43 }, { num: 44 }]).pipe(operators_1.map(function (s) { return s.num; })));
            });
        });
        it('should work with observable and project', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                expectObservable(state.select('num')).toBe('(abc)', {
                    a: 42,
                    b: 43,
                    c: 44
                });
                state.connect(rxjs_1.from([{ num: 42 }, { num: 43 }, { num: 44 }]), function (s, n) { return ({ num: n.num }); });
            });
        });
        it('should work with prop name and observable and reducer', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                expectObservable(state.select('num')).toBe('(abc)', {
                    a: 42,
                    b: 43,
                    c: 44
                });
                state.connect('num', rxjs_1.from([{ num: 42 }, { num: 43 }, { num: 44 }]), function (s, v) { return v.num; });
            });
        });
        it('should throw with wrong params', function () {
            var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
            expect(function () { return state.connect('some string'); }).toThrowError('wrong params passed to connect');
        });
    });
    describe('setAccumulator', function () {
        it('should work before a value was emitted', function () {
            var numAccCalls = 0;
            var customAcc = function (s, sl) {
                ++numAccCalls;
                return tslib_1.__assign(tslib_1.__assign({}, s), sl);
            };
            var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                expectObservable(state.select('num')).toBe('(abc)', {
                    a: 42,
                    b: 43,
                    c: 44
                });
                state.setAccumulator(customAcc);
                state.set({ num: 42 });
                state.set({ num: 43 });
                state.set({ num: 44 });
            });
            expect(numAccCalls).toBe(3);
        });
        it('should work in between emissions', function () {
            var numAcc1Calls = 0;
            var customAcc1 = function (s, sl) {
                ++numAcc1Calls;
                return tslib_1.__assign(tslib_1.__assign({}, s), sl);
            };
            var numAcc2Calls = 0;
            var customAcc2 = function (s, sl) {
                ++numAcc2Calls;
                return tslib_1.__assign(tslib_1.__assign({}, s), sl);
            };
            var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                expectObservable(state.select('num')).toBe('(abc)', {
                    a: 42,
                    b: 43,
                    c: 44
                });
                state.set({ num: 42 });
                state.setAccumulator(customAcc1);
                state.set({ num: 43 });
                state.setAccumulator(customAcc2);
                state.set({ num: 44 });
            });
            expect(numAcc1Calls).toBe(1);
            expect(numAcc2Calls).toBe(1);
        });
    });
    describe('hold', function () {
        it('should work with effect-observable', function () {
            testScheduler.run(function (_a) {
                var cold = _a.cold, expectSubscriptions = _a.expectSubscriptions;
                var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
                var test$ = cold('(abc)', { a: 1, b: 2, c: 3 });
                var sub = '(^!)';
                var stop = new rxjs_1.Subject();
                state.hold(test$.pipe(operators_1.takeUntil(stop)));
                stop.next(1);
                expectSubscriptions(test$.subscriptions).toBe(sub);
            });
        });
        it('should work with observable and effect', testing_1.fakeAsync(function () {
            var calls = 0;
            var effect = function (v) {
                calls = calls + 1;
            };
            var state = setupState({ initialState: fixtures_1.initialPrimitiveState });
            state.hold(rxjs_1.of(1, 2, 3), effect);
            expect(calls).toBe(3);
        }));
    });
});
//# sourceMappingURL=rx-state.service.spec.js.map