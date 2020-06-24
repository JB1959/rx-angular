"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var utils_1 = require("../../core/utils");
var stateful_1 = require("./stateful");
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
            return state$.pipe(stateful_1.stateful());
        }
        else if (utils_1.isStringArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful_1.stateful(operators_1.pluck.apply(void 0, tslib_1.__spread(opOrMapFn))));
        }
        else if (utils_1.isOperateFnArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful_1.stateful(utils_1.pipeFromArray(opOrMapFn)));
        }
        else {
            throw new Error('wrong params passed to select');
        }
    };
}
exports.select = select;
//# sourceMappingURL=select.js.map