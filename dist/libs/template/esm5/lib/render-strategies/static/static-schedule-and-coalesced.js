import { from } from 'rxjs';
import { staticCoalesce } from './static-coalesce';
import { schedule } from './static-schedule';
import { getUnpatchedResolvedPromise } from '../../core/utils/unpatched-promise';
export function coalesceAndSchedule(work, priority, scope) {
    if (scope === void 0) { scope = {}; }
    var durationSelector = from(getUnpatchedResolvedPromise());
    var scheduledWork = function () { return schedule(work, priority); };
    staticCoalesce(scheduledWork, durationSelector, scope);
}
//# sourceMappingURL=static-schedule-and-coalesced.js.map