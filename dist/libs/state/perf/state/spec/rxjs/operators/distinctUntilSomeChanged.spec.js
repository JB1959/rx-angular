"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _test_helpers_1 = require("@test-helpers");
var operators_1 = require("rxjs/operators");
var operators_2 = require("../../../src/lib/rxjs/operators");
var rxjs_1 = require("rxjs");
var testing_1 = require("rxjs/testing");
var testScheduler;
beforeEach(function () {
    testScheduler = new testing_1.TestScheduler(_test_helpers_1.jestMatcher);
});
/** @test {distinctUntilSomeChanged} */
describe('distinctUntilSomeChanged operator', function () {
    it('should distinguish between values', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 }, b: { val: 2 } };
            var e1 = cold('--a--a--a--b--b--a--|', values);
            var e1subs = '^-------------------!';
            var expected = '--a--------b-----a--|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should distinguish between values with multiple keys', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 }, b: { val: 1, valOther: 3 } };
            var e1 = cold('--a--a--a--b--b--a--|', values);
            var e1subs = '^-------------------!';
            var expected = '--a--------b-----a--|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val', 'valOther']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should ignore changes of other keys', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 }, b: { val: 1, valOther: 3 } };
            var e1 = cold('--a--a--a--b--b--a--|', values);
            var e1subs = '^-------------------!';
            var expected = '--a-----------------|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should distinguish between values by keyCompareMap', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { val: 2 },
                c: {
                    val: 2,
                    objVal: {
                        foo: 'foo',
                        bar: 'bar'
                    }
                },
                d: {
                    val: 2,
                    objVal: {
                        foo: 'foo2',
                        bar: 'bar'
                    }
                },
                e: {
                    val: 2,
                    objVal: {
                        foo: 'foo2',
                        bar: 'bar3'
                    }
                }
            };
            var e1 = cold('--a--a--b--c--d--e--|', values);
            var e1subs = '^-------------------!';
            var expected = '--a-----b--c--d-----|';
            var keyCompare = {
                val: undefined,
                objVal: function (oldVal, newVal) { return (oldVal === null || oldVal === void 0 ? void 0 : oldVal.foo) === (newVal === null || newVal === void 0 ? void 0 : newVal.foo); }
            };
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(keyCompare))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should distinguish between values and does not completes', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 }, b: { val: 2 } };
            var e1 = cold('--a--a--a--b--b--a-', values);
            var e1subs = '^------------------';
            var expected = '--a--------b-----a-';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should distinguish between values with key', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { valOther: 1 },
                c: { valOther: 3 },
                d: { val: 1 },
                e: { val: 5 }
            };
            var e1 = cold('--a--b--c--d--e--|', values);
            var e1subs = '^----------------!';
            var expected = '--a--b-----d--e--|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should not compare if source does not have element with key', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { valOther: 1 },
                b: { valOther: 1 },
                c: { valOther: 3 },
                d: { valOther: 1 },
                e: { valOther: 5 }
            };
            var e1 = cold('--a--b--c--d--e--|', values);
            var e1subs = '^----------------!';
            var expected = '--a--------------|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should not completes if source never completes', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var e1 = cold('-');
            var e1subs = '^';
            var expected = '-';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should not completes if source does not completes', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var e1 = cold('-');
            var e1subs = '^';
            var expected = '-';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should complete if source is empty', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var e1 = cold('|');
            var e1subs = '(^!)';
            var expected = '|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should complete if source does not emit', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var e1 = cold('------|');
            var e1subs = '^-----!';
            var expected = '------|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should emit if source emits single element only', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 } };
            var e1 = cold('--a--|', values);
            var e1subs = '^----!';
            var expected = '--a--|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should emit if source is scalar', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 } };
            var e1 = rxjs_1.of(values.a);
            var expected = '(a|)';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
        });
    });
    it('should raises error if source raises error', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 } };
            var e1 = cold('--a--a--#', values);
            var e1subs = '^-------!';
            var expected = '--a-----#';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should raises error if source throws', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var e1 = cold('#');
            var e1subs = '(^!)';
            var expected = '#';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should not omit if source elements are all different', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { val: 2 },
                c: { val: 3 },
                d: { val: 4 },
                e: { val: 5 }
            };
            var e1 = cold('--a--b--c--d--e--|', values);
            var e1subs = '^----------------!';
            var expected = '--a--b--c--d--e--|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should allow unsubscribing early and explicitly', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { val: 2 },
                c: { val: 3 },
                d: { val: 4 },
                e: { val: 5 }
            };
            var e1 = cold('--a--b--b--d--a--e--|', values);
            var e1subs = '^---------!          ';
            var expected = '--a--b-----          ';
            var unsub = '----------!          ';
            var result = e1.pipe(operators_2.distinctUntilSomeChanged(['val']));
            expectObservable(result, unsub).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should not break unsubscription chains when unsubscribed explicitly', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { val: 2 },
                c: { val: 3 },
                d: { val: 4 },
                e: { val: 5 }
            };
            var e1 = cold('--a--b--b--d--a--e--|', values);
            var e1subs = '^---------!          ';
            var expected = '--a--b-----          ';
            var unsub = '----------!          ';
            var result = e1.pipe(operators_1.mergeMap(function (x) { return rxjs_1.of(x); }), operators_2.distinctUntilSomeChanged(['val']), operators_1.mergeMap(function (x) { return rxjs_1.of(x); }));
            expectObservable(result, unsub).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should emit once if source elements are all same', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 } };
            var e1 = cold('--a--a--a--a--a--a--|', values);
            var e1subs = '^-------------------!';
            var expected = '--a-----------------|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val']))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should emit once if comparer returns true always regardless of source emits', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { val: 2 },
                c: { val: 3 },
                d: { val: 4 },
                e: { val: 5 }
            };
            var e1 = cold('--a--b--c--d--e--|', values);
            var e1subs = '^----------------!';
            var expected = '--a--------------|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val'], function () { return true; }))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should emit all if comparer returns false always regardless of source emits', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = { a: { val: 1 } };
            var e1 = cold('--a--a--a--a--a--a--|', values);
            var e1subs = '^-------------------!';
            var expected = '--a--a--a--a--a--a--|';
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val'], function () { return false; }))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should distinguish values by selector', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { val: 2 },
                c: { val: 3 },
                d: { val: 4 },
                e: { val: 5 }
            };
            var e1 = cold('--a--b--c--d--e--|', values);
            var e1subs = '^----------------!';
            var expected = '--a-----c-----e--|';
            var selector = function (x, y) { return y % 2 === 0; };
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val'], selector))).toBe(expected, values);
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
    it('should raises error when comparer throws', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectObservable = _a.expectObservable, expectSubscriptions = _a.expectSubscriptions;
            var values = {
                a: { val: 1 },
                b: { val: 2 },
                c: { val: 3 },
                d: { val: 4 },
                e: { val: 5 }
            };
            var e1 = cold('--a--b--c--d--e--|', values);
            var e1subs = '^----------!      ';
            var expected = '--a--b--c--#      ';
            var selector = function (x, y) {
                if (y === 4) {
                    throw new Error('error');
                }
                return x === y;
            };
            expectObservable(e1.pipe(operators_2.distinctUntilSomeChanged(['val'], selector))).toBe(expected, values, new Error('error'));
            expectSubscriptions(e1.subscriptions).toBe(e1subs);
        });
    });
});
//# sourceMappingURL=distinctUntilSomeChanged.spec.js.map