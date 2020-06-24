import { Observable, Subject, Subscribable } from 'rxjs';
export declare function createSideEffectObservable<T>(stateObservables?: Subject<Observable<T>>): {
    effects$: Observable<T>;
    nextEffectObservable: (effect$: Observable<T>) => void;
} & Subscribable<T>;
