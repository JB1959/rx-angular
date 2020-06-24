import { Observable } from 'rxjs';
import { RenderStrategy, StrategySelection } from './interfaces';
export declare function nameToStrategy<U>(strategies: StrategySelection<U>): (o$: Observable<string>) => Observable<RenderStrategy<U>>;
