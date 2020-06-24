import { tap } from 'rxjs/operators';
export function renderChange(strategy) {
    return function (s) {
        return s.pipe(strategy.behavior, tap(function (v) { return strategy.renderMethod(); }));
    };
}
//# sourceMappingURL=renderChange.js.map