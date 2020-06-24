"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../src");
var operators_1 = require("rxjs/operators");
exports.initialNestedState = {
    obj: {
        key1: {
            key11: {
                key111: 'test'
            }
        }
    }
};
exports.initialPrimitiveState = {
    str: 'str',
    num: 42,
    bol: true
};
function setupState(cfg) {
    var initialState = tslib_1.__assign({}, cfg).initialState;
    var state = new src_1.RxState();
    if (initialState) {
        state.set(initialState);
    }
    return state;
}
exports.setupState = setupState;
function createStateChecker(assert) {
    return {
        checkState: checkState,
        checkSubscriptions: checkSubscriptions
    };
    function checkState(service, stateOrProject, project) {
        if (typeof stateOrProject === 'object' && project === undefined) {
            assert(service.get(), stateOrProject);
            service
                .select(operators_1.take(1))
                .subscribe(function (actual) { return assert(actual, stateOrProject); });
            return;
        }
        if (typeof stateOrProject === 'object' && typeof project === 'function') {
            assert(project(service.get()), stateOrProject);
            service
                .select(operators_1.take(1))
                .subscribe(function (actual) { return assert(project(actual), stateOrProject); });
            return;
        }
        throw Error('Wrong param. Should be object and optional projection function');
    }
    function checkSubscriptions(service, numTotalSubs) {
        var actual = service.subscription._subscriptions
            ? service.subscription._subscriptions.length
            : 0;
        assert(actual, numTotalSubs);
    }
}
exports.createStateChecker = createStateChecker;
//# sourceMappingURL=fixtures.js.map