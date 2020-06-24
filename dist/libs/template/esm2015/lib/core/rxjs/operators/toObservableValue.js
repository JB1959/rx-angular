import { from, of } from 'rxjs';
export function toObservableValue(p) {
    // @ts-ignore
    return p == null ? of(p) : from(p);
}
//# sourceMappingURL=toObservableValue.js.map