import { OperatorFunction } from 'rxjs';
export declare function isPromiseGuard<T>(value: unknown): value is Promise<T>;
export declare function isOperateFnArrayGuard<T, R = T>(op: any[]): op is OperatorFunction<T, R>[];
export declare function isStringArrayGuard(op: any[]): op is string[];
export declare function isIterableGuard<T>(obj: unknown): obj is Array<T>;
export declare function isKeyOf<O>(k: unknown): k is keyof O;
