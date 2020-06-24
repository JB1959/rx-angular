import { from } from 'rxjs';
import { staticCoalesce } from './static-coalesce';
import { schedule } from './static-schedule';
import { getUnpatchedResolvedPromise } from '../../core/utils/unpatched-promise';
export function coalesceAndSchedule(work, priority, scope = {}) {
    const durationSelector = from(getUnpatchedResolvedPromise());
    const scheduledWork = () => schedule(work, priority);
    staticCoalesce(scheduledWork, durationSelector, scope);
}
//# sourceMappingURL=static-schedule-and-coalesced.js.map