import { Observable } from 'rxjs';
import { getZoneUnPatchedApi } from '../../../core';
const animationFrameTick = new Observable(subscriber => {
    let i = 0;
    const id = getZoneUnPatchedApi('requestAnimationFrame')(() => {
        subscriber.next(++i);
    });
    return () => {
        getZoneUnPatchedApi('cancelAnimationFrame')(id);
    };
});
export const unpatchedAnimationFrameScheduler = {
    now() {
        return 0;
    },
    schedule(work, options, state) {
        return animationFrameTick.subscribe(() => work(state));
    }
};
//# sourceMappingURL=animationFrameScheduler.js.map