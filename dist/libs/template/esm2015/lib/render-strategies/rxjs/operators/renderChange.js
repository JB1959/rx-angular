import { tap } from 'rxjs/operators';
export function renderChange(strategy) {
    return (s) => {
        return s.pipe(strategy.behavior, tap(v => strategy.renderMethod()));
    };
}
//# sourceMappingURL=renderChange.js.map