import { NextObserver, Observable, Subscribable } from 'rxjs';
import { RenderStrategy, StrategySelection } from './interfaces';
export interface RenderAware<U> extends Subscribable<U> {
    nextPotentialObservable: (value: any) => void;
    nextStrategy: (config: string | Observable<string>) => void;
    activeStrategy$: Observable<RenderStrategy<U>>;
}
/**
 * RenderAware
 *
 * @description
 * This function returns an object that holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export declare function createRenderAware<U>(cfg: {
    strategies: StrategySelection<U>;
    resetObserver: NextObserver<void>;
    updateObserver: NextObserver<U>;
}): RenderAware<U | undefined | null>;
