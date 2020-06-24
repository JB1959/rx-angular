import { Observable, ObservableInput } from 'rxjs';
export declare function toObservableValue<T>(p: ObservableInput<T> | undefined | null): Observable<T | undefined | null>;
