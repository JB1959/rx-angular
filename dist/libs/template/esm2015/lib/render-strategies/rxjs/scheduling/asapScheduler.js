import { from } from 'rxjs';
import { getUnpatchedResolvedPromise } from '../../../core';
export const unpatchedAsapScheduler = {
    now() {
        return 0;
    },
    schedule(work, options, state) {
        return from(getUnpatchedResolvedPromise()).subscribe(() => work(state));
    }
};
//# sourceMappingURL=asapScheduler.js.map