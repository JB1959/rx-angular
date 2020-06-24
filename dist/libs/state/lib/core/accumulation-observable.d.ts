import { BehaviorSubject, Observable, Subject, Subscribable } from 'rxjs';
export declare type AccumulationFn = <T>(st: T, sl: Partial<T>) => T;
interface Accumulator<T> extends Subscribable<T> {
    state: T;
    state$: Observable<T>;
    signal$: Observable<T>;
    nextSlice: (stateSlice: Partial<T>) => void;
    nextSliceObservable: (state$: Observable<Partial<T>>) => void;
    nextAccumulator: (fn: AccumulationFn) => void;
}
export declare function createAccumulationObservable<T extends object>(stateObservables?: Subject<Observable<Partial<T>>>, stateSlices?: Subject<Partial<T>>, accumulatorObservable?: BehaviorSubject<AccumulationFn>): Accumulator<T>;
export {};
