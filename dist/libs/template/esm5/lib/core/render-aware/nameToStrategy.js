import { distinctUntilChanged, map } from 'rxjs/operators';
export function nameToStrategy(strategies) {
    return function (o$) {
        return o$.pipe(distinctUntilChanged(), map(function (strategy) {
            var s = strategies[strategy];
            if (!!s) {
                return s;
            }
            throw new Error("Strategy " + strategy + " does not exist.");
        }));
    };
}
//# sourceMappingURL=nameToStrategy.js.map