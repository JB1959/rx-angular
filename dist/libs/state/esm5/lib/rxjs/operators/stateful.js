import { distinctUntilChanged, filter, shareReplay } from 'rxjs/operators';
import { isOperateFnArrayGuard, pipeFromArray } from '../../core/utils';
/**
 * @description
 *
 * As it acts like the Observables `pipe` method, it accepts one or many RxJS operators as params.
 *
 * @example
 * import { Observable } from 'rxjs';
 * import { map } from 'rxjs/operators';
 * import { stateful } from 'rx-angular/state';
 *
 * const state$: Observable<{ name: string; items: string[] }>;
 * const derivation$ = state$.pipe(
 *   stateful(
 *     map(state => state.list.length),
 *     filter(length => length > 3)
 *   )
 * );
 *
 * @param {OperatorFunction<T, A>} op - one or multiple passed operator comma separated
 *
 * @docsPage stateful
 * @docsCategory operators
 */
export function stateful() {
    var optionalDerive = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        optionalDerive[_i] = arguments[_i];
    }
    return function (s) {
        return s.pipe(
        // distinct same base-state objects (e.g. a default emission of default switch cases, incorrect mutable handling
        // of data) @TODO evaluate benefits vs. overhead
        distinctUntilChanged(), 
        // CUSTOM LOGIC HERE
        function (o) {
            if (isOperateFnArrayGuard(optionalDerive)) {
                return o.pipe(pipeFromArray(optionalDerive));
            }
            return o;
        }, 
        // initial emissions, undefined is no base-state, pollution with skip(1)
        filter(function (v) { return v !== undefined; }), 
        // distinct same derivation value
        distinctUntilChanged(), 
        // reuse custom operations result for multiple subscribers and reemit the last calculated value.
        shareReplay({ bufferSize: 1, refCount: true }));
    };
}
//# sourceMappingURL=stateful.js.map