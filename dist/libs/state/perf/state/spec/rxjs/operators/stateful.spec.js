"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _test_helpers_1 = require("@test-helpers");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var testing_1 = require("rxjs/testing");
var state_1 = require("@rx-angular/state");
var testScheduler;
beforeEach(function () {
    testScheduler = new testing_1.TestScheduler(_test_helpers_1.jestMatcher);
});
describe('stateful', function () {
    it('should mirror EMPTY', function () {
        testScheduler.run(function (_a) {
            var expectObservable = _a.expectObservable;
            var source = rxjs_1.EMPTY;
            expectObservable(source.pipe(state_1.stateful())).toBe('|');
        });
    });
    it('should mirror NEVER', function () {
        testScheduler.run(function (_a) {
            var expectObservable = _a.expectObservable;
            var source = rxjs_1.NEVER;
            expectObservable(source.pipe(state_1.stateful())).toBe('');
        });
    });
    it('should pass values as they are', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var source = cold('v|');
            expectObservable(source.pipe(state_1.stateful())).toBe('v|');
        });
    });
    it('should pass only distinct values', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var source = cold('v-v-a-a-v|');
            expectObservable(source.pipe(state_1.stateful())).toBe('v---a---v|');
        });
    });
    it('should pass only values other than undefined', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var values = { u: undefined, a: null, b: '', c: [], d: {} };
            var source = cold('u-a-b-c-d|', values);
            expectObservable(source.pipe(state_1.stateful())).toBe('--a-b-c-d|', values);
        });
    });
    it('should replay the last emitted value', function () { });
    it('should accept one operator', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var values = { a: 2, b: 4 };
            var source = cold('a|', values);
            expectObservable(source.pipe(state_1.stateful(operators_1.map(function (v) { return v * 2; })))).toBe('b|', values);
        });
    });
    it('should accept multiple operators', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var values = { a: 2, b: 4 };
            var source = cold('a|', values);
            expectObservable(source.pipe(state_1.stateful(operators_1.map(function (v) { return v * 2; }), operators_1.map(function (v) { return v / 2; }), operators_1.map(function (v) { return v * 2; }), operators_1.map(function (v) { return v / 2; }), operators_1.map(function (v) { return v * 2; })))).toBe('b|', values);
        });
    });
});
//# sourceMappingURL=stateful.spec.js.map