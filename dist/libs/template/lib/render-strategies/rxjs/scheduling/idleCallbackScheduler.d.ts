import { SchedulerLike } from 'rxjs';
/**
 *
 * Implementation based on rxjs-etc => IdleScheduler
 *
 */
declare type IdleId = ReturnType<typeof setTimeout>;
declare type RequestIdleCallbackHandle = any;
interface RequestIdleCallbackOptions {
    timeout: number;
}
interface RequestIdleCallbackDeadline {
    readonly didTimeout: boolean;
    timeRemaining: () => number;
}
declare type RequestIdleCallback = (callback: (deadline: RequestIdleCallbackDeadline) => void, opts?: RequestIdleCallbackOptions) => RequestIdleCallbackHandle;
declare type CancelIdleCallback = (idleId: IdleId) => void;
export declare const cancelIdleCallback: CancelIdleCallback;
export declare const requestIdleCallback: RequestIdleCallback;
export declare const idleScheduler: SchedulerLike;
export {};
