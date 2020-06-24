import { Observable } from 'rxjs';
import { getZoneUnPatchedApi } from '../../../core';
var animationFrameTick = new Observable(function (subscriber) {
    var i = 0;
    var id = getZoneUnPatchedApi('requestAnimationFrame')(function () {
        subscriber.next(++i);
    });
    return function () {
        getZoneUnPatchedApi('cancelAnimationFrame')(id);
    };
});
export var unpatchedAnimationFrameScheduler = {
    now: function () {
        return 0;
    },
    schedule: function (work, options, state) {
        return animationFrameTick.subscribe(function () { return work(state); });
    }
};
//# sourceMappingURL=animationFrameScheduler.js.map