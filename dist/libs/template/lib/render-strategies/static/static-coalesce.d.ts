import { Subscribable } from 'rxjs';
export declare function staticCoalesce<T>(work: () => T, durationSelector: Subscribable<any>, scope?: object): void;
