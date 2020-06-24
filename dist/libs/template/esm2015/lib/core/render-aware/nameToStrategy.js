import { distinctUntilChanged, map } from 'rxjs/operators';
export function nameToStrategy(strategies) {
    return (o$) => {
        return o$.pipe(distinctUntilChanged(), map((strategy) => {
            const s = strategies[strategy];
            if (!!s) {
                return s;
            }
            throw new Error(`Strategy ${strategy} does not exist.`);
        }));
    };
}
//# sourceMappingURL=nameToStrategy.js.map