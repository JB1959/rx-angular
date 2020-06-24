import { SchedulerLike } from 'rxjs';
import { SchedulingPriority } from './interfaces';
export declare const prioritySchedulerMap: {
    [name: string]: SchedulerLike;
};
export declare function getScheduler(priority: SchedulingPriority): SchedulerLike;
