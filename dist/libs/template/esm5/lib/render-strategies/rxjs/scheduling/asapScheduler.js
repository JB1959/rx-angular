import { from } from 'rxjs';
import { getUnpatchedResolvedPromise } from '../../../core';
export var unpatchedAsapScheduler = {
    now: function () {
        return 0;
    },
    schedule: function (work, options, state) {
        return from(getUnpatchedResolvedPromise()).subscribe(function () { return work(state); });
    }
};
//# sourceMappingURL=asapScheduler.js.map