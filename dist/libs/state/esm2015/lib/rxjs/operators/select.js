import { pluck } from 'rxjs/operators';
import { isOperateFnArrayGuard, isStringArrayGuard, pipeFromArray } from '../../core/utils';
import { stateful } from './stateful';
/**
 * @internal
 */
export function select(...opOrMapFn) {
    return (state$) => {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return state$.pipe(stateful());
        }
        else if (isStringArrayGuard(opOrMapFn)) {
            return state$.pipe(stateful(pluck(...opOrMapFn)));
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