import { getScheduler } from '../rxjs/scheduling/priority-scheduler-map';
export function schedule(work, priority) {
    return getScheduler(priority).schedule(() => work());
}
//# sourceMappingURL=static-schedule.js.map