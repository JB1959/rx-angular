import { Subscription } from 'rxjs';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
export declare function schedule(work: () => void, priority?: SchedulingPriority): Subscription;
