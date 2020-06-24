import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
export declare function coalesceAndSchedule(work: () => void, priority: SchedulingPriority, scope?: object): void;
