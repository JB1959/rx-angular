import { animationFrameScheduler, asapScheduler, asyncScheduler } from 'rxjs';
import { getPostTaskScheduler, PostTaskSchedulerPriority } from './getPostTaskScheduler';
import { idleScheduler } from './idleCallbackScheduler';
export var prioritySchedulerMap = {
    animationFrame: animationFrameScheduler,
    Promise: asapScheduler,
    setInterval: asyncScheduler,
    idleCallback: idleScheduler,
    userBlocking: getPostTaskScheduler(PostTaskSchedulerPriority.userBlocking),
    userVisible: getPostTaskScheduler(PostTaskSchedulerPriority.userVisible),
    background: getPostTaskScheduler(PostTaskSchedulerPriority.background)
};
export function getScheduler(priority) {
    if (!prioritySchedulerMap.hasOwnProperty(priority)) {
        throw new Error("priority " + priority + " is not present in prioritiesMap");
    }
    return prioritySchedulerMap[priority];
}
//# sourceMappingURL=priority-scheduler-map.js.map