import { SchedulerLike } from 'rxjs';
/**
 *
 * Implementation based on rxjs-etc => IdleScheduler
 *
 */
export declare enum PostTaskSchedulerPriority {
    background = "background",
    userBlocking = "user-blocking",
    userVisible = "user-visible"
}
interface PostTaskScheduler {
    postTask<T>(cb: () => void, options: SchedulerPostTaskOptions): Promise<T>;
}
interface SchedulerPostTaskOptions {
    priority: PostTaskSchedulerPriority | string | null;
    delay: number;
    signal?: any;
}
export declare const postTaskScheduler: PostTaskScheduler;
export declare function getPostTaskScheduler(priority: PostTaskSchedulerPriority): SchedulerLike;
export {};
