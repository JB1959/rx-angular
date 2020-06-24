import { OnDestroy } from '@angular/core';
import { Observable, OperatorFunction, Subscribable, Unsubscribable } from 'rxjs';
import { AccumulationFn } from './core';
import * as ɵngcc0 from '@angular/core';
declare type ProjectStateFn<T> = (oldState: T) => Partial<T>;
declare type ProjectValueFn<T, K extends keyof T> = (oldState: T) => T[K];
declare type ProjectStateReducer<T, V> = (oldState: T, value: V) => Partial<T>;
declare type ProjectValueReducer<T, K extends keyof T, V> = (oldState: T, value: V) => T[K];
/**
 * @description
 * RxState is a light-weight reactive state management service for managing local state in angular.
 *
 * ![state logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_logo.png)
 *
 * @example
 * Component({
 *   selector: 'app-stateful',
 *   template: `<div>{{ state$ | async | json }}</div>`,
 *   providers: [RxState]
 * })
 * export class StatefulComponent {
 *   readonly state$ = this.state.select();
 *
 *   constructor(private state: RxState<{ foo: string }>) {}
 * }
 *
 * @docsCategory RxState
 * @docsPage RxState
 */
export declare class RxState<T extends object> implements OnDestroy, Subscribable<T> {
    private subscription;
    private accumulator;
    private effectObservable;
    /**
     * @description
     * The unmodified state exposed as `Observable<T>`. It is not shared, distinct or gets replayed.
     * Use the `$` property if you want to read the state without having applied {@link stateful} to it.
     */
    readonly $: Observable<T>;
    /**
     * @internal
     */
    constructor();
    /**
     * @internal
     */
    ngOnDestroy(): void;
    setAccumulator(accumulatorFn: AccumulationFn): void;
    /**
     * @description
     * Read from the state in imperative manner. Returns the state object in its current state.
     *
     * @example
     * const { disabled } = state.get();
     * if (!disabled) {
     *   doStuff();
     * }
     *
     * @return T
     */
    get(): T;
    /**
     * @description
     * Manipulate one or many properties of the state by providing a `Partial<T>` state or a `ProjectionFunction<T>`.
     *
     * @example
     * // Update one or many properties of the state by providing a `Partial<T>`
     *
     * const partialState = {
     *   foo: 'bar',
     *   bar: 5
     * };
     * state.set(partialState);
     *
     * // Update one or many properties of the state by providing a `ProjectionFunction<T>`
     *
     * const reduceFn = oldState => ({
     *   bar: oldState.bar + 5
     * });
     * state.set(reduceFn);
     *
     * @param {Partial<T>|ProjectStateFn<T>} stateOrProjectState
     * @return void
     */
    set(stateOrProjectState: Partial<T> | ProjectStateFn<T>): void;
    /**
     * @description
     * Manipulate a single property of the state by the property name and a `ProjectionFunction<T>`.
     *
     * @example
     * const reduceFn = oldState => oldState.bar + 5;
     * state.set('bar', reduceFn);
     *
     * @param {K} key
     * @param {ProjectValueFn<T, K>} projectSlice
     * @return void
     */
    set<K extends keyof T, O>(key: K, projectSlice: ProjectValueFn<T, K>): void;
    /**
     * @description
     * Connect an `Observable<Partial<T>>` to the state `T`.
     * Any change emitted by the source will get merged into the state.
     * Subscription handling is done automatically.
     *
     * @example
     * const sliceToAdd$ = interval(250).pipe(mapTo({
     *   bar: 5,
     *   foo: 'foo'
     * });
     * state.connect(sliceToAdd$);
     * // every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$
     *
     * // Additionally you can provide a `projectionFunction` to access the current state object and do custom mappings.
     *
     * const sliceToAdd$ = interval(250).pipe(mapTo({
     *   bar: 5,
     *   foo: 'foo'
     * });
     * state.connect(sliceToAdd$, (state, slice) => state.bar += slice.bar);
     * // every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$. Bar will increase by
     * // 5 due to the projectionFunction
     */
    connect<V>(inputOrSlice$: Observable<Partial<T> | V>, projectFn?: ProjectStateReducer<T, V>): void;
    /**
     *
     * @description
     * Connect an `Observable<T[K]>` source to a specific property `K` in the state `T`. Any emitted change will update
     * this
     * specific property in the state.
     * Subscription handling is done automatically.
     *
     * @example
     * const myTimer$ = interval(250);
     * state.connect('timer', myTimer$);
     * // every 250ms the property timer will get updated
     */
    connect<K extends keyof T>(key: K, slice$: Observable<T[K]>): void;
    /**
     *
     * @description
     * Connect an `Observable<V>` source to a specific property in the state. Additionally you can provide a
     * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
     * Any change emitted by the source will get merged into the state.
     * Subscription handling is done automatically.
     *
     * @example
     * const myTimer$ = interval(250);
     * state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
     * // every 250ms the property timer will get updated
     */
    connect<K extends keyof T, V>(key: K, input$: Observable<V>, projectSliceFn: ProjectValueReducer<T, K, V>): void;
    /**
     * @description
     * returns the state as cached and distinct `Observable<T>`. This way you don't have to think about **late
     * subscribers**,
     * **multiple subscribers** or **multiple emissions** of the same value
     *
     * @example
     * const state$ = state.select();
     * state$.subscribe(state => doStuff(state));
     *
     * @returns Observable<T>
     */
    select(): Observable<T>;
    /**
     * @description
     * returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
     * [rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.
     *
     * @example
     * const profilePicture$ = state.select(
     *  pluck('profilePicture'),
     *  switchMap(profilePicture => mapImageAsync(profilePicture))
     * );
     * @param op { OperatorFunction<T, A> }
     * @returns Observable<A>
     */
    select<A = T>(op: OperatorFunction<T, A>): Observable<A>;
    /**
     * @internal
     */
    select<A = T, B = A>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
    /**
     * @internal
     */
    select<A = T, B = A, C = B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
    /**
     * @internal
     */
    select<A = T, B = A, C = B, D = C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
    /**
     * @internal
     */
    select<A = T, B = A, C = B, D = C, E = D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
    /**
     * @description
     * Access a single property of the state by providing keys.
     * Returns a single property of the state as cached and distinct `Observable<T[K1]>`.
     *
     * @example
     * // Access a single property
     *
     * const bar$ = state.select('bar');
     *
     * // Access a nested property
     *
     * const foo$ = state.select('bar', 'foo');
     *
     * @return Observable<T[K1]>
     */
    select<K1 extends keyof T>(k1: K1): Observable<T[K1]>;
    /**
     * @internal
     */
    select<K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): Observable<T[K1][K2]>;
    /**
     * @internal
     */
    select<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(k1: K1, k2: K2, k3: K3): Observable<T[K1][K2][K3]>;
    /**
     * @internal
     */
    select<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(k1: K1, k2: K2, k3: K3, k4: K4): Observable<T[K1][K2][K3][K4]>;
    /**
     * @internal
     */
    select<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Observable<T[K1][K2][K3][K4][K5]>;
    /**
     * @internal
     */
    select<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): Observable<T[K1][K2][K3][K4][K5][K6]>;
    /**
     * @description
     * Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
     * `sideEffectFunction`.
     * Subscription handling is done automatically.
     *
     * @example
     * // Directly pass an observable side-effect
     * const localStorageEffect$ = changes$.pipe(
     *  tap(changes => storeChanges(changes))
     * );
     * state.hold(localStorageEffect$);
     *
     * // Pass an additional `sideEffectFunction`
     *
     * const localStorageEffectFn = changes => storeChanges(changes);
     * state.hold(changes$, localStorageEffectFn);
     *
     * @param {Observable<S>} obsOrObsWithSideEffect
     * @param {function} [sideEffectFn]
     */
    hold<S>(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void): void;
    /**
     * @internal
     */
    subscribe(): Unsubscribable;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<RxState<any>, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<RxState<any>>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicngtc3RhdGUuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJyeC1zdGF0ZS5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9wZXJhdG9yRnVuY3Rpb24sIFN1YnNjcmliYWJsZSwgVW5zdWJzY3JpYmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQWNjdW11bGF0aW9uRm4gfSBmcm9tICcuL2NvcmUnO1xyXG5kZWNsYXJlIHR5cGUgUHJvamVjdFN0YXRlRm48VD4gPSAob2xkU3RhdGU6IFQpID0+IFBhcnRpYWw8VD47XHJcbmRlY2xhcmUgdHlwZSBQcm9qZWN0VmFsdWVGbjxULCBLIGV4dGVuZHMga2V5b2YgVD4gPSAob2xkU3RhdGU6IFQpID0+IFRbS107XHJcbmRlY2xhcmUgdHlwZSBQcm9qZWN0U3RhdGVSZWR1Y2VyPFQsIFY+ID0gKG9sZFN0YXRlOiBULCB2YWx1ZTogVikgPT4gUGFydGlhbDxUPjtcclxuZGVjbGFyZSB0eXBlIFByb2plY3RWYWx1ZVJlZHVjZXI8VCwgSyBleHRlbmRzIGtleW9mIFQsIFY+ID0gKG9sZFN0YXRlOiBULCB2YWx1ZTogVikgPT4gVFtLXTtcclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBSeFN0YXRlIGlzIGEgbGlnaHQtd2VpZ2h0IHJlYWN0aXZlIHN0YXRlIG1hbmFnZW1lbnQgc2VydmljZSBmb3IgbWFuYWdpbmcgbG9jYWwgc3RhdGUgaW4gYW5ndWxhci5cclxuICpcclxuICogIVtzdGF0ZSBsb2dvXShodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQmlvUGhvdG9uL3J4LWFuZ3VsYXIvbWFzdGVyL2xpYnMvc3RhdGUvaW1hZ2VzL3N0YXRlX2xvZ28ucG5nKVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBDb21wb25lbnQoe1xyXG4gKiAgIHNlbGVjdG9yOiAnYXBwLXN0YXRlZnVsJyxcclxuICogICB0ZW1wbGF0ZTogYDxkaXY+e3sgc3RhdGUkIHwgYXN5bmMgfCBqc29uIH19PC9kaXY+YCxcclxuICogICBwcm92aWRlcnM6IFtSeFN0YXRlXVxyXG4gKiB9KVxyXG4gKiBleHBvcnQgY2xhc3MgU3RhdGVmdWxDb21wb25lbnQge1xyXG4gKiAgIHJlYWRvbmx5IHN0YXRlJCA9IHRoaXMuc3RhdGUuc2VsZWN0KCk7XHJcbiAqXHJcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0ZTogUnhTdGF0ZTx7IGZvbzogc3RyaW5nIH0+KSB7fVxyXG4gKiB9XHJcbiAqXHJcbiAqIEBkb2NzQ2F0ZWdvcnkgUnhTdGF0ZVxyXG4gKiBAZG9jc1BhZ2UgUnhTdGF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUnhTdGF0ZTxUIGV4dGVuZHMgb2JqZWN0PiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgU3Vic2NyaWJhYmxlPFQ+IHtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uO1xyXG4gICAgcHJpdmF0ZSBhY2N1bXVsYXRvcjtcclxuICAgIHByaXZhdGUgZWZmZWN0T2JzZXJ2YWJsZTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBUaGUgdW5tb2RpZmllZCBzdGF0ZSBleHBvc2VkIGFzIGBPYnNlcnZhYmxlPFQ+YC4gSXQgaXMgbm90IHNoYXJlZCwgZGlzdGluY3Qgb3IgZ2V0cyByZXBsYXllZC5cclxuICAgICAqIFVzZSB0aGUgYCRgIHByb3BlcnR5IGlmIHlvdSB3YW50IHRvIHJlYWQgdGhlIHN0YXRlIHdpdGhvdXQgaGF2aW5nIGFwcGxpZWQge0BsaW5rIHN0YXRlZnVsfSB0byBpdC5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgJDogT2JzZXJ2YWJsZTxUPjtcclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCk7XHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgc2V0QWNjdW11bGF0b3IoYWNjdW11bGF0b3JGbjogQWNjdW11bGF0aW9uRm4pOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIFJlYWQgZnJvbSB0aGUgc3RhdGUgaW4gaW1wZXJhdGl2ZSBtYW5uZXIuIFJldHVybnMgdGhlIHN0YXRlIG9iamVjdCBpbiBpdHMgY3VycmVudCBzdGF0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY29uc3QgeyBkaXNhYmxlZCB9ID0gc3RhdGUuZ2V0KCk7XHJcbiAgICAgKiBpZiAoIWRpc2FibGVkKSB7XHJcbiAgICAgKiAgIGRvU3R1ZmYoKTtcclxuICAgICAqIH1cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRcclxuICAgICAqL1xyXG4gICAgZ2V0KCk6IFQ7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogTWFuaXB1bGF0ZSBvbmUgb3IgbWFueSBwcm9wZXJ0aWVzIG9mIHRoZSBzdGF0ZSBieSBwcm92aWRpbmcgYSBgUGFydGlhbDxUPmAgc3RhdGUgb3IgYSBgUHJvamVjdGlvbkZ1bmN0aW9uPFQ+YC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gVXBkYXRlIG9uZSBvciBtYW55IHByb3BlcnRpZXMgb2YgdGhlIHN0YXRlIGJ5IHByb3ZpZGluZyBhIGBQYXJ0aWFsPFQ+YFxyXG4gICAgICpcclxuICAgICAqIGNvbnN0IHBhcnRpYWxTdGF0ZSA9IHtcclxuICAgICAqICAgZm9vOiAnYmFyJyxcclxuICAgICAqICAgYmFyOiA1XHJcbiAgICAgKiB9O1xyXG4gICAgICogc3RhdGUuc2V0KHBhcnRpYWxTdGF0ZSk7XHJcbiAgICAgKlxyXG4gICAgICogLy8gVXBkYXRlIG9uZSBvciBtYW55IHByb3BlcnRpZXMgb2YgdGhlIHN0YXRlIGJ5IHByb3ZpZGluZyBhIGBQcm9qZWN0aW9uRnVuY3Rpb248VD5gXHJcbiAgICAgKlxyXG4gICAgICogY29uc3QgcmVkdWNlRm4gPSBvbGRTdGF0ZSA9PiAoe1xyXG4gICAgICogICBiYXI6IG9sZFN0YXRlLmJhciArIDVcclxuICAgICAqIH0pO1xyXG4gICAgICogc3RhdGUuc2V0KHJlZHVjZUZuKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1BhcnRpYWw8VD58UHJvamVjdFN0YXRlRm48VD59IHN0YXRlT3JQcm9qZWN0U3RhdGVcclxuICAgICAqIEByZXR1cm4gdm9pZFxyXG4gICAgICovXHJcbiAgICBzZXQoc3RhdGVPclByb2plY3RTdGF0ZTogUGFydGlhbDxUPiB8IFByb2plY3RTdGF0ZUZuPFQ+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBNYW5pcHVsYXRlIGEgc2luZ2xlIHByb3BlcnR5IG9mIHRoZSBzdGF0ZSBieSB0aGUgcHJvcGVydHkgbmFtZSBhbmQgYSBgUHJvamVjdGlvbkZ1bmN0aW9uPFQ+YC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY29uc3QgcmVkdWNlRm4gPSBvbGRTdGF0ZSA9PiBvbGRTdGF0ZS5iYXIgKyA1O1xyXG4gICAgICogc3RhdGUuc2V0KCdiYXInLCByZWR1Y2VGbik7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtLfSBrZXlcclxuICAgICAqIEBwYXJhbSB7UHJvamVjdFZhbHVlRm48VCwgSz59IHByb2plY3RTbGljZVxyXG4gICAgICogQHJldHVybiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHNldDxLIGV4dGVuZHMga2V5b2YgVCwgTz4oa2V5OiBLLCBwcm9qZWN0U2xpY2U6IFByb2plY3RWYWx1ZUZuPFQsIEs+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25uZWN0IGFuIGBPYnNlcnZhYmxlPFBhcnRpYWw8VD4+YCB0byB0aGUgc3RhdGUgYFRgLlxyXG4gICAgICogQW55IGNoYW5nZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2Ugd2lsbCBnZXQgbWVyZ2VkIGludG8gdGhlIHN0YXRlLlxyXG4gICAgICogU3Vic2NyaXB0aW9uIGhhbmRsaW5nIGlzIGRvbmUgYXV0b21hdGljYWxseS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY29uc3Qgc2xpY2VUb0FkZCQgPSBpbnRlcnZhbCgyNTApLnBpcGUobWFwVG8oe1xyXG4gICAgICogICBiYXI6IDUsXHJcbiAgICAgKiAgIGZvbzogJ2ZvbydcclxuICAgICAqIH0pO1xyXG4gICAgICogc3RhdGUuY29ubmVjdChzbGljZVRvQWRkJCk7XHJcbiAgICAgKiAvLyBldmVyeSAyNTBtcyB0aGUgcHJvcGVydGllcyBiYXIgYW5kIGZvbyBnZXQgdXBkYXRlZCBkdWUgdG8gdGhlIGVtaXNzaW9uIG9mIHNsaWNlVG9BZGQkXHJcbiAgICAgKlxyXG4gICAgICogLy8gQWRkaXRpb25hbGx5IHlvdSBjYW4gcHJvdmlkZSBhIGBwcm9qZWN0aW9uRnVuY3Rpb25gIHRvIGFjY2VzcyB0aGUgY3VycmVudCBzdGF0ZSBvYmplY3QgYW5kIGRvIGN1c3RvbSBtYXBwaW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBjb25zdCBzbGljZVRvQWRkJCA9IGludGVydmFsKDI1MCkucGlwZShtYXBUbyh7XHJcbiAgICAgKiAgIGJhcjogNSxcclxuICAgICAqICAgZm9vOiAnZm9vJ1xyXG4gICAgICogfSk7XHJcbiAgICAgKiBzdGF0ZS5jb25uZWN0KHNsaWNlVG9BZGQkLCAoc3RhdGUsIHNsaWNlKSA9PiBzdGF0ZS5iYXIgKz0gc2xpY2UuYmFyKTtcclxuICAgICAqIC8vIGV2ZXJ5IDI1MG1zIHRoZSBwcm9wZXJ0aWVzIGJhciBhbmQgZm9vIGdldCB1cGRhdGVkIGR1ZSB0byB0aGUgZW1pc3Npb24gb2Ygc2xpY2VUb0FkZCQuIEJhciB3aWxsIGluY3JlYXNlIGJ5XHJcbiAgICAgKiAvLyA1IGR1ZSB0byB0aGUgcHJvamVjdGlvbkZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3Q8Vj4oaW5wdXRPclNsaWNlJDogT2JzZXJ2YWJsZTxQYXJ0aWFsPFQ+IHwgVj4sIHByb2plY3RGbj86IFByb2plY3RTdGF0ZVJlZHVjZXI8VCwgVj4pOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBDb25uZWN0IGFuIGBPYnNlcnZhYmxlPFRbS10+YCBzb3VyY2UgdG8gYSBzcGVjaWZpYyBwcm9wZXJ0eSBgS2AgaW4gdGhlIHN0YXRlIGBUYC4gQW55IGVtaXR0ZWQgY2hhbmdlIHdpbGwgdXBkYXRlXHJcbiAgICAgKiB0aGlzXHJcbiAgICAgKiBzcGVjaWZpYyBwcm9wZXJ0eSBpbiB0aGUgc3RhdGUuXHJcbiAgICAgKiBTdWJzY3JpcHRpb24gaGFuZGxpbmcgaXMgZG9uZSBhdXRvbWF0aWNhbGx5LlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjb25zdCBteVRpbWVyJCA9IGludGVydmFsKDI1MCk7XHJcbiAgICAgKiBzdGF0ZS5jb25uZWN0KCd0aW1lcicsIG15VGltZXIkKTtcclxuICAgICAqIC8vIGV2ZXJ5IDI1MG1zIHRoZSBwcm9wZXJ0eSB0aW1lciB3aWxsIGdldCB1cGRhdGVkXHJcbiAgICAgKi9cclxuICAgIGNvbm5lY3Q8SyBleHRlbmRzIGtleW9mIFQ+KGtleTogSywgc2xpY2UkOiBPYnNlcnZhYmxlPFRbS10+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogQ29ubmVjdCBhbiBgT2JzZXJ2YWJsZTxWPmAgc291cmNlIHRvIGEgc3BlY2lmaWMgcHJvcGVydHkgaW4gdGhlIHN0YXRlLiBBZGRpdGlvbmFsbHkgeW91IGNhbiBwcm92aWRlIGFcclxuICAgICAqIGBwcm9qZWN0aW9uRnVuY3Rpb25gIHRvIGFjY2VzcyB0aGUgY3VycmVudCBzdGF0ZSBvYmplY3Qgb24gZXZlcnkgZW1pc3Npb24gb2YgeW91ciBjb25uZWN0ZWQgYE9ic2VydmFibGVgLlxyXG4gICAgICogQW55IGNoYW5nZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2Ugd2lsbCBnZXQgbWVyZ2VkIGludG8gdGhlIHN0YXRlLlxyXG4gICAgICogU3Vic2NyaXB0aW9uIGhhbmRsaW5nIGlzIGRvbmUgYXV0b21hdGljYWxseS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY29uc3QgbXlUaW1lciQgPSBpbnRlcnZhbCgyNTApO1xyXG4gICAgICogc3RhdGUuY29ubmVjdCgndGltZXInLCBteVRpbWVyJCwgKHN0YXRlLCB0aW1lckNoYW5nZSkgPT4gc3RhdGUudGltZXIgKz0gdGltZXJDaGFuZ2UpO1xyXG4gICAgICogLy8gZXZlcnkgMjUwbXMgdGhlIHByb3BlcnR5IHRpbWVyIHdpbGwgZ2V0IHVwZGF0ZWRcclxuICAgICAqL1xyXG4gICAgY29ubmVjdDxLIGV4dGVuZHMga2V5b2YgVCwgVj4oa2V5OiBLLCBpbnB1dCQ6IE9ic2VydmFibGU8Vj4sIHByb2plY3RTbGljZUZuOiBQcm9qZWN0VmFsdWVSZWR1Y2VyPFQsIEssIFY+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiByZXR1cm5zIHRoZSBzdGF0ZSBhcyBjYWNoZWQgYW5kIGRpc3RpbmN0IGBPYnNlcnZhYmxlPFQ+YC4gVGhpcyB3YXkgeW91IGRvbid0IGhhdmUgdG8gdGhpbmsgYWJvdXQgKipsYXRlXHJcbiAgICAgKiBzdWJzY3JpYmVycyoqLFxyXG4gICAgICogKiptdWx0aXBsZSBzdWJzY3JpYmVycyoqIG9yICoqbXVsdGlwbGUgZW1pc3Npb25zKiogb2YgdGhlIHNhbWUgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY29uc3Qgc3RhdGUkID0gc3RhdGUuc2VsZWN0KCk7XHJcbiAgICAgKiBzdGF0ZSQuc3Vic2NyaWJlKHN0YXRlID0+IGRvU3R1ZmYoc3RhdGUpKTtcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFQ+XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdCgpOiBPYnNlcnZhYmxlPFQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIHJldHVybnMgdGhlIHN0YXRlIGFzIGNhY2hlZCBhbmQgZGlzdGluY3QgYE9ic2VydmFibGU8QT5gLiBBY2NlcHRzIGFyYml0cmFyeVxyXG4gICAgICogW3J4anMgb3BlcmF0b3JzXShodHRwczovL3J4anMtZGV2LmZpcmViYXNlYXBwLmNvbS9ndWlkZS9vcGVyYXRvcnMpIHRvIGVucmljaCB0aGUgc2VsZWN0aW9uIHdpdGggcmVhY3RpdmUgY29tcG9zaXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNvbnN0IHByb2ZpbGVQaWN0dXJlJCA9IHN0YXRlLnNlbGVjdChcclxuICAgICAqICBwbHVjaygncHJvZmlsZVBpY3R1cmUnKSxcclxuICAgICAqICBzd2l0Y2hNYXAocHJvZmlsZVBpY3R1cmUgPT4gbWFwSW1hZ2VBc3luYyhwcm9maWxlUGljdHVyZSkpXHJcbiAgICAgKiApO1xyXG4gICAgICogQHBhcmFtIG9wIHsgT3BlcmF0b3JGdW5jdGlvbjxULCBBPiB9XHJcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEE+XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdDxBID0gVD4ob3A6IE9wZXJhdG9yRnVuY3Rpb248VCwgQT4pOiBPYnNlcnZhYmxlPEE+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgc2VsZWN0PEEgPSBULCBCID0gQT4ob3AxOiBPcGVyYXRvckZ1bmN0aW9uPFQsIEE+LCBvcDI6IE9wZXJhdG9yRnVuY3Rpb248QSwgQj4pOiBPYnNlcnZhYmxlPEI+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgc2VsZWN0PEEgPSBULCBCID0gQSwgQyA9IEI+KG9wMTogT3BlcmF0b3JGdW5jdGlvbjxULCBBPiwgb3AyOiBPcGVyYXRvckZ1bmN0aW9uPEEsIEI+LCBvcDM6IE9wZXJhdG9yRnVuY3Rpb248QiwgQz4pOiBPYnNlcnZhYmxlPEM+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgc2VsZWN0PEEgPSBULCBCID0gQSwgQyA9IEIsIEQgPSBDPihvcDE6IE9wZXJhdG9yRnVuY3Rpb248VCwgQT4sIG9wMjogT3BlcmF0b3JGdW5jdGlvbjxBLCBCPiwgb3AzOiBPcGVyYXRvckZ1bmN0aW9uPEIsIEM+LCBvcDQ6IE9wZXJhdG9yRnVuY3Rpb248QywgRD4pOiBPYnNlcnZhYmxlPEQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgc2VsZWN0PEEgPSBULCBCID0gQSwgQyA9IEIsIEQgPSBDLCBFID0gRD4ob3AxOiBPcGVyYXRvckZ1bmN0aW9uPFQsIEE+LCBvcDI6IE9wZXJhdG9yRnVuY3Rpb248QSwgQj4sIG9wMzogT3BlcmF0b3JGdW5jdGlvbjxCLCBDPiwgb3A0OiBPcGVyYXRvckZ1bmN0aW9uPEMsIEQ+LCBvcDU6IE9wZXJhdG9yRnVuY3Rpb248RCwgRT4pOiBPYnNlcnZhYmxlPEU+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIEFjY2VzcyBhIHNpbmdsZSBwcm9wZXJ0eSBvZiB0aGUgc3RhdGUgYnkgcHJvdmlkaW5nIGtleXMuXHJcbiAgICAgKiBSZXR1cm5zIGEgc2luZ2xlIHByb3BlcnR5IG9mIHRoZSBzdGF0ZSBhcyBjYWNoZWQgYW5kIGRpc3RpbmN0IGBPYnNlcnZhYmxlPFRbSzFdPmAuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIEFjY2VzcyBhIHNpbmdsZSBwcm9wZXJ0eVxyXG4gICAgICpcclxuICAgICAqIGNvbnN0IGJhciQgPSBzdGF0ZS5zZWxlY3QoJ2JhcicpO1xyXG4gICAgICpcclxuICAgICAqIC8vIEFjY2VzcyBhIG5lc3RlZCBwcm9wZXJ0eVxyXG4gICAgICpcclxuICAgICAqIGNvbnN0IGZvbyQgPSBzdGF0ZS5zZWxlY3QoJ2JhcicsICdmb28nKTtcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIE9ic2VydmFibGU8VFtLMV0+XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdDxLMSBleHRlbmRzIGtleW9mIFQ+KGsxOiBLMSk6IE9ic2VydmFibGU8VFtLMV0+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgc2VsZWN0PEsxIGV4dGVuZHMga2V5b2YgVCwgSzIgZXh0ZW5kcyBrZXlvZiBUW0sxXT4oazE6IEsxLCBrMjogSzIpOiBPYnNlcnZhYmxlPFRbSzFdW0syXT47XHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBzZWxlY3Q8SzEgZXh0ZW5kcyBrZXlvZiBULCBLMiBleHRlbmRzIGtleW9mIFRbSzFdLCBLMyBleHRlbmRzIGtleW9mIFRbSzFdW0syXT4oazE6IEsxLCBrMjogSzIsIGszOiBLMyk6IE9ic2VydmFibGU8VFtLMV1bSzJdW0szXT47XHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBzZWxlY3Q8SzEgZXh0ZW5kcyBrZXlvZiBULCBLMiBleHRlbmRzIGtleW9mIFRbSzFdLCBLMyBleHRlbmRzIGtleW9mIFRbSzFdW0syXSwgSzQgZXh0ZW5kcyBrZXlvZiBUW0sxXVtLMl1bSzNdPihrMTogSzEsIGsyOiBLMiwgazM6IEszLCBrNDogSzQpOiBPYnNlcnZhYmxlPFRbSzFdW0syXVtLM11bSzRdPjtcclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdDxLMSBleHRlbmRzIGtleW9mIFQsIEsyIGV4dGVuZHMga2V5b2YgVFtLMV0sIEszIGV4dGVuZHMga2V5b2YgVFtLMV1bSzJdLCBLNCBleHRlbmRzIGtleW9mIFRbSzFdW0syXVtLM10sIEs1IGV4dGVuZHMga2V5b2YgVFtLMV1bSzJdW0szXVtLNF0+KGsxOiBLMSwgazI6IEsyLCBrMzogSzMsIGs0OiBLNCwgazU6IEs1KTogT2JzZXJ2YWJsZTxUW0sxXVtLMl1bSzNdW0s0XVtLNV0+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgc2VsZWN0PEsxIGV4dGVuZHMga2V5b2YgVCwgSzIgZXh0ZW5kcyBrZXlvZiBUW0sxXSwgSzMgZXh0ZW5kcyBrZXlvZiBUW0sxXVtLMl0sIEs0IGV4dGVuZHMga2V5b2YgVFtLMV1bSzJdW0szXSwgSzUgZXh0ZW5kcyBrZXlvZiBUW0sxXVtLMl1bSzNdW0s0XSwgSzYgZXh0ZW5kcyBrZXlvZiBUW0sxXVtLMl1bSzNdW0s0XVtLNV0+KGsxOiBLMSwgazI6IEsyLCBrMzogSzMsIGs0OiBLNCwgazU6IEs1LCBrNjogSzYpOiBPYnNlcnZhYmxlPFRbSzFdW0syXVtLM11bSzRdW0s1XVtLNl0+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb25cclxuICAgICAqIE1hbmFnZXMgc2lkZS1lZmZlY3RzIG9mIHlvdXIgc3RhdGUuIFByb3ZpZGUgYW4gYE9ic2VydmFibGU8YW55PmAgKipzaWRlLWVmZmVjdCoqIGFuZCBhbiBvcHRpb25hbFxyXG4gICAgICogYHNpZGVFZmZlY3RGdW5jdGlvbmAuXHJcbiAgICAgKiBTdWJzY3JpcHRpb24gaGFuZGxpbmcgaXMgZG9uZSBhdXRvbWF0aWNhbGx5LlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBEaXJlY3RseSBwYXNzIGFuIG9ic2VydmFibGUgc2lkZS1lZmZlY3RcclxuICAgICAqIGNvbnN0IGxvY2FsU3RvcmFnZUVmZmVjdCQgPSBjaGFuZ2VzJC5waXBlKFxyXG4gICAgICogIHRhcChjaGFuZ2VzID0+IHN0b3JlQ2hhbmdlcyhjaGFuZ2VzKSlcclxuICAgICAqICk7XHJcbiAgICAgKiBzdGF0ZS5ob2xkKGxvY2FsU3RvcmFnZUVmZmVjdCQpO1xyXG4gICAgICpcclxuICAgICAqIC8vIFBhc3MgYW4gYWRkaXRpb25hbCBgc2lkZUVmZmVjdEZ1bmN0aW9uYFxyXG4gICAgICpcclxuICAgICAqIGNvbnN0IGxvY2FsU3RvcmFnZUVmZmVjdEZuID0gY2hhbmdlcyA9PiBzdG9yZUNoYW5nZXMoY2hhbmdlcyk7XHJcbiAgICAgKiBzdGF0ZS5ob2xkKGNoYW5nZXMkLCBsb2NhbFN0b3JhZ2VFZmZlY3RGbik7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYnNlcnZhYmxlPFM+fSBvYnNPck9ic1dpdGhTaWRlRWZmZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbc2lkZUVmZmVjdEZuXVxyXG4gICAgICovXHJcbiAgICBob2xkPFM+KG9ic09yT2JzV2l0aFNpZGVFZmZlY3Q6IE9ic2VydmFibGU8Uz4sIHNpZGVFZmZlY3RGbj86IChhcmc6IFMpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgc3Vic2NyaWJlKCk6IFVuc3Vic2NyaWJhYmxlO1xyXG59XHJcbmV4cG9ydCB7fTtcclxuIl19