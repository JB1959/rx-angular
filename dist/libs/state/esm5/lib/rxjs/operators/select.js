import { __read, __spread } from "tslib";
import { pluck } from 'rxjs/operators';
import { isOperateFnArrayGuard, isStringArrayGuard, pipeFromArray } from '../../core/utils';
import { stateful } from './stateful';
/**
 * @internal
 */
export function select() {
    var opOrMapFn = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        opOrMapFn[_i] = arguments[_i];
    }
    return function (state$) {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return state$.pipe(stateful());
        }
        else if (isStringArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful(pluck.apply(void 0, __spread(opOrMapFn))));
        }
        else if (isOperateFnArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful(pipeFromArray(opOrMapFn)));
        }
        else {
            throw new Error('wrong params passed to select');
        }
    };
}
//# sourceMappingURL=select.js.map