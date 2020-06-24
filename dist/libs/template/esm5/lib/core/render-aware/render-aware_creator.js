import { __read } from "tslib";
import { EMPTY, of, ReplaySubject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { nameToStrategy } from './nameToStrategy';
/**
 * RenderAware
 *
 * @description
 * This function returns an object that holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export function createRenderAware(cfg) {
    var strategyName$ = new ReplaySubject(1);
    var strategy$ = strategyName$.pipe(distinctUntilChanged(), switchMap(function (stringOrObservable) {
        return typeof stringOrObservable === 'string'
            ? of(stringOrObservable)
            : stringOrObservable;
    }), nameToStrategy(cfg.strategies));
    var observablesFromTemplate$ = new ReplaySubject(1);
    var valuesFromTemplate$ = observablesFromTemplate$.pipe(distinctUntilChanged());
    var firstTemplateObservableChange = true;
    var renderingEffect$ = valuesFromTemplate$.pipe(
    // handle null | undefined assignment and new Observable reset
    map(function (observable$) {
        if (observable$ === null) {
            return of(null);
        }
        if (!firstTemplateObservableChange) {
            cfg.resetObserver.next();
            if (observable$ === undefined) {
                return of(undefined);
            }
        }
        firstTemplateObservableChange = false;
        return observable$;
    }), 
    // forward only observable values
    filter(function (o$) { return o$ !== undefined; }), switchMap(function (o$) { return o$.pipe(distinctUntilChanged(), tap(cfg.updateObserver)); }), withLatestFrom(strategy$), tap(function (_a) {
        var _b = __read(_a, 2), v = _b[0], strat = _b[1];
        return strat.scheduleCD();
    }), catchError(function (e) {
        console.error(e);
        return EMPTY;
    }));
    return {
        nextPotentialObservable: function (value) {
            observablesFromTemplate$.next(value);
        },
        nextStrategy: function (nextConfig) {
            strategyName$.next(nextConfig);
        },
        activeStrategy$: strategy$,
        subscribe: function () {
            return new Subscription()
                .add(strategy$.subscribe())
                .add(renderingEffect$.subscribe());
        }
    };
}
//# sourceMappingURL=render-aware_creator.js.map