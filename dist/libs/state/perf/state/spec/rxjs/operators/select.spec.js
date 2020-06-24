"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _test_helpers_1 = require("@test-helpers");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var testing_1 = require("rxjs/testing");
var state_1 = require("@rx-angular/state");
var fixtures_1 = require("../../fixtures");
var testScheduler;
beforeEach(function () {
    testScheduler = new testing_1.TestScheduler(_test_helpers_1.jestMatcher);
});
describe('select', function () {
    describe('should mirror the behavior of the stateful and', function () {
        it('should mirror EMPTY', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var source = rxjs_1.EMPTY;
                expectObservable(source.pipe(state_1.select())).toBe('|');
            });
        });
        it('should mirror NEVER', function () {
            testScheduler.run(function (_a) {
                var expectObservable = _a.expectObservable;
                var source = rxjs_1.NEVER;
                expectObservable(source.pipe(state_1.select())).toBe('');
            });
        });
        it('should pass values as they are', function () {
            testScheduler.run(function (_a) {
                var cold = _a.cold, expectObservable = _a.expectObservable;
                var source = cold('v|');
                expectObservable(source.pipe(state_1.select())).toBe('v|');
            });
        });
        it('should pass only distinct values', function () {
            testScheduler.run(function (_a) {
                var cold = _a.cold, expectObservable = _a.expectObservable;
                var source = cold('v-v-a-a-v|');
                expectObservable(source.pipe(state_1.select())).toBe('v---a---v|');
            });
        });
        it('should pass only values other than undefined', function () {
            testScheduler.run(function (_a) {
                var cold = _a.cold, expectObservable = _a.expectObservable;
                var values = { u: undefined, a: null, b: '', c: [], d: {} };
                var source = cold('u-a-b-c-d|', values);
                expectObservable(source.pipe(state_1.select())).toBe('--a-b-c-d|', values);
            });
        });
        it('should replay the last emitted value', function () { });
        it('should accept one operator', function () {
            testScheduler.run(function (_a) {
                var cold = _a.cold, expectObservable = _a.expectObservable;
                var values = { a: 2, b: 4 };
                var source = cold('a|', values);
                expectObservable(source.pipe(state_1.select(operators_1.map(function (v) { return v * 2; })))).toBe('b|', values);
            });
        });
        it('should accept multiple operators', function () {
            testScheduler.run(function (_a) {
                var cold = _a.cold, expectObservable = _a.expectObservable;
                var values = { a: 2, b: 4 };
                var source = cold('a|', values);
                expectObservable(source.pipe(state_1.select(operators_1.map(function (v) { return v * 2; }), operators_1.map(function (v) { return v / 2; }), operators_1.map(function (v) { return v * 2; }), operators_1.map(function (v) { return v / 2; }), operators_1.map(function (v) { return v * 2; })))).toBe('b|', values);
            });
        });
    });
    it('should accept one string keyof T', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var primitiveState = {
                bol: true,
                str: 'string',
                num: 42
            };
            var source = cold('a|', {
                a: primitiveState
            });
            expectObservable(source.pipe(state_1.select('bol'))).toBe('a|', { a: true });
        });
    });
    it('should accept multiple strings keyof T', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var source = cold('a|', {
                a: fixtures_1.initialNestedState
            });
            expectObservable(source.pipe(state_1.select('obj', 'key1', 'key11', 'key111'))).toBe('a|', { a: 'test' });
        });
    });
    it('should accept one operator', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var source = cold('a|', {
                a: fixtures_1.initialPrimitiveState
            });
            expectObservable(source.pipe(state_1.select(operators_1.map(function (s) { return s.bol; })))).toBe('a|', {
                a: true
            });
        });
    });
    it('should accept multiple operators', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable;
            var source = cold('a|', {
                a: fixtures_1.initialNestedState
            });
            expectObservable(source.pipe(state_1.select(operators_1.map(function (s) { return s.obj; }), operators_1.map(function (s) { return s.key1; }), operators_1.map(function (s) { return s.key11; }), operators_1.map(function (s) { return s.key111; })))).toBe('a|', { a: 'test' });
        });
    });
    it('should throw with wrong params', function () {
        expect(function () { return rxjs_1.of().pipe(state_1.select(true)); }).toThrowError('wrong params passed to select');
    });
});
//# sourceMappingURL=select.spec.js.map