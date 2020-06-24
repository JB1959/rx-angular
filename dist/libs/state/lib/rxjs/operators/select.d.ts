import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
/**
 * @description
 * returns the state as shared, replayed and distinct `Observable<T>`. This way you don't have to think about late
 * subscribers, multiple subscribers or multiple emissions of the same value.
 *
 * @example
 * const state$ = state.pipe(select());
 * state$.subscribe(state => doStuff(state));
 *
 * @returns Observable<T>
 */
export declare function select<T>(): MonoTypeOperatorFunction<T>;
/**
 * @description
 * returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
 * [rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.
 *
 * @example
 * const profilePicture$ = state.pipe(
 *   select(
 *    pluck('profilePicture'),
 *    switchMap(profilePicture => mapImageAsync(profilePicture))
 *   )
 * );
 * @param  { OperatorFunction<T, A> } op
 * @returns Observable<A>
 *
 * @docsPage select
 * @docsCategory operators
 */
export declare function select<T, A>(op: OperatorFunction<T, A>): OperatorFunction<T, A>;
/**
 * @internal
 */
export declare function select<T, A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): OperatorFunction<T, B>;
/**
 * @internal
 */
export declare function select<T, A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): OperatorFunction<T, C>;
/**
 * @internal
 */
export declare function select<T, A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): OperatorFunction<T, D>;
/**
 * @internal
 */
export declare function select<T, A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): OperatorFunction<T, E>;
/**
 * @description
 * Access a single property of the state by providing keys.
 * Returns a single property of the state as cached and distinct `Observable<T[K1]>`.
 *
 * @example
 *  // Access a single property
 * const bar$ = state$.pipe(select('bar'));
 *
 * // Access a nested property
 * const foo$ = state$.pipe(select('bar', 'foo'));
 *
 * @return Observable<T[K1]>
 */
export declare function select<T, K1 extends keyof T>(k1: K1): OperatorFunction<T, T[K1]>;
/**
 * @internal
 */
export declare function select<T, K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): OperatorFunction<T, T[K1][K2]>;
/**
 * @internal
 */
export declare function select<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(k1: K1, k2: K2, k3: K3): OperatorFunction<T, T[K1][K2][K3]>;
/**
 * @internal
 */
export declare function select<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(k1: K1, k2: K2, k3: K3, k4: K4): OperatorFunction<T, T[K1][K2][K3][K4]>;
/**
 * @internal
 */
export declare function select<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): OperatorFunction<T, T[K1][K2][K3][K4][K5]>;
/**
 * @internal
 */
export declare function select<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): OperatorFunction<T, T[K1][K2][K3][K4][K5][K6]>;
