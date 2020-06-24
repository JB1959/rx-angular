import { UnaryFunction } from 'rxjs';
export declare function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R>;
