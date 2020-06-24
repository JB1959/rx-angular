"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _test_helpers_1 = require("@test-helpers");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var testing_1 = require("rxjs/testing");
var core_1 = require("../../src/lib/core");
var initialPrimitiveState = {
    str: 'string',
    num: 42,
    bol: true
};
function setupAccumulationObservable(cfg) {
    var _a = tslib_1.__assign({ initialize: true }, cfg), initialState = _a.initialState, initialize = _a.initialize;
    var acc = core_1.createAccumulationObservable();
    if (initialize) {
        acc.subscribe();
    }
    if (initialState) {
        acc.nextSlice(initialState);
    }
    return acc;
}
var testScheduler;
beforeEach(function () {
    testScheduler = new testing_1.TestScheduler(_test_helpers_1.jestMatcher);
});
// tslint:disable: no-duplicate-string
describe('createAccumulationObservable', function () {
    it('should return object', function () {
        var acc = core_1.createAccumulationObservable();
        expect(acc).toBeDefined();
    });
    describe('signal$', function () {
        it('should return NO empty base-state after init when subscribing late', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupAccumulationObservable({});
                expectObservable(state.signal$).toBe('');
            });
        });
        it('should return No changes when subscribing late', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var state = setupAccumulationObservable({});
                state.subscribe();
                state.nextSlice({ num: 42 });
                expectObservable(state.signal$.pipe(operators_1.pluck('num'))).toBe('');
            });
        });
        it('should return changes after subscription', function () {
            var state = setupAccumulationObservable({});
            state.subscribe();
            state.nextSlice({ num: 42 });
            var slice$ = state.signal$.pipe(core_1.select('num'));
            var i = -1;
            var valuesInOrder = ['', { num: 777 }];
            slice$.subscribe(function (next) { return expect(next).toBe(valuesInOrder[++i]); });
            state.nextSlice({ num: 777 });
        });
    });
    describe('state$', function () {
        it('should return nothing without subscriber', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var acc = setupAccumulationObservable({
                    initialState: initialPrimitiveState,
                    initialize: false
                });
                expectObservable(acc.state$).toBe('');
            });
        });
        it('should return nothing after init', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var acc = setupAccumulationObservable({
                    initialize: true
                });
                expectObservable(acc.state$).toBe('');
            });
        });
        it('should return initial base-state', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var acc = setupAccumulationObservable({
                    initialState: initialPrimitiveState
                });
                expectObservable(acc.state$).toBe('s', { s: initialPrimitiveState });
            });
        });
    });
    describe('state', function () {
        it('should return {} without subscriber', function () {
            var acc = setupAccumulationObservable({
                initialize: false
            });
            expect(acc.state).toStrictEqual({});
        });
        it('should return {} with subscriber', function () {
            var acc = setupAccumulationObservable({
                initialize: true
            });
            expect(acc.state).toStrictEqual({});
        });
        it('should return {} after init', function () {
            var acc = setupAccumulationObservable({
                initialize: true
            });
            expect(acc.state).toStrictEqual({});
        });
        it('should return initial base-state', function () {
            var acc = setupAccumulationObservable({
                initialState: initialPrimitiveState
            });
            expect(acc.state).toEqual(initialPrimitiveState);
        });
    });
    describe('nextSlice', function () {
        it('should add new base-state by partial', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var acc = setupAccumulationObservable({});
                acc.nextSlice({ num: 42 });
                expectObservable(acc.state$.pipe(operators_1.pluck('num'))).toBe('s', { s: 42 });
            });
        });
        it('should override previous base-state by partial', function () {
            var acc = setupAccumulationObservable({
                initialState: initialPrimitiveState
            });
            acc.state$
                .pipe(operators_1.pluck('num'))
                .subscribe(function (res) { return expect(res).toBe({ s: 42 }); });
            acc.nextSlice({ num: 43 });
            acc.state$
                .pipe(operators_1.pluck('num'))
                .subscribe(function (res) { return expect(res).toBe({ s: 43 }); });
        });
    });
    describe('connectState', function () {
        it('should add new slices', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var acc = setupAccumulationObservable({});
                acc.nextSliceObservable(rxjs_1.of({ num: 42 }));
                expectObservable(acc.state$.pipe(operators_1.pluck('num'))).toBe('s', { s: 42 });
            });
        });
        it('should override previous base-state slices', function () {
            var acc = setupAccumulationObservable({
                initialState: initialPrimitiveState
            });
            acc.state$
                .pipe(operators_1.pluck('num'))
                .subscribe(function (res) { return expect(res).toBe({ s: 42 }); });
            acc.nextSliceObservable(rxjs_1.of({ num: 43 }));
            acc.state$
                .pipe(operators_1.pluck('num'))
                .subscribe(function (res) { return expect(res).toBe({ s: 42 }); });
        });
    });
    describe('nextAccumulator', function () {
        it('should accept new accumulator functions while running', function () {
            var numAccCalls = 0;
            var customAcc = function (s, sl) {
                ++numAccCalls;
                return tslib_1.__assign(tslib_1.__assign({}, s), sl);
            };
            var acc = setupAccumulationObservable({});
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                acc.nextSlice({ num: 42 });
                expectObservable(acc.state$.pipe(operators_1.pluck('num'))).toBe('(abc)', {
                    a: 42,
                    b: 43,
                    c: 44
                });
                acc.nextAccumulator(customAcc);
                acc.nextSlice({ num: 43 });
                acc.nextSlice({ num: 44 });
            });
            expect(numAccCalls).toBe(2);
        });
    });
});
//# sourceMappingURL=accumulation-observable.spec.js.map