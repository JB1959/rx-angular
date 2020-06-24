"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _test_helpers_1 = require("@test-helpers");
var testing_1 = require("rxjs/testing");
var core_1 = require("../../src/lib/core");
var testScheduler;
beforeEach(function () {
    testScheduler = new testing_1.TestScheduler(_test_helpers_1.jestMatcher);
});
// tslint:disable: no-duplicate-string
describe('createSideEffectObservable', function () {
    it('should be defined', function () {
        testScheduler.run(function () {
            var ef = core_1.createSideEffectObservable();
            expect(ef).toBeDefined();
        });
    });
    it('should subscribe', function () {
        testScheduler.run(function (_a) {
            var cold = _a.cold, expectSubscriptions = _a.expectSubscriptions;
            var ef = core_1.createSideEffectObservable();
            var subMain = ef.subscribe();
            var test$ = cold('(abc)', { a: 1, b: 2, c: 3 });
            var sub = '(^!)';
            ef.nextEffectObservable(test$);
            subMain.unsubscribe();
            expectSubscriptions(test$.subscriptions).toBe(sub);
        });
    });
});
//# sourceMappingURL=side-effect-observable.spec.js.map