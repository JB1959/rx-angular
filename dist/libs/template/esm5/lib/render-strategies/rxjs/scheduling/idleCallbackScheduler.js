import { __extends } from "tslib";
import { asyncScheduler, Subscription } from 'rxjs';
export var cancelIdleCallback = typeof window !== 'undefined'
    ? window.cancelIdleCallback ||
        function (idleId) {
            console.warn('Fake cancelIdleCallback used');
            clearTimeout(idleId);
        }
    : function () { };
export var requestIdleCallback = typeof window !== 'undefined'
    ? window.requestIdleCallback ||
        function (cb) {
            console.warn('Fake requestIdleCallback used');
            var start = Date.now();
            return setTimeout(function () {
                cb({
                    didTimeout: false,
                    timeRemaining: function () {
                        return Math.max(0, 50 - (Date.now() - start));
                    }
                });
            }, 1);
        }
    : function () { };
var IdleAction = /** @class */ (function (_super) {
    __extends(IdleAction, _super);
    function IdleAction(work) {
        var _this = _super.call(this) || this;
        _this.work = work;
        return _this;
    }
    IdleAction.prototype.schedule = function (state, delay) {
        if (this.closed) {
            return this;
        }
        return idleScheduler.schedule(this.work, delay, state);
    };
    return IdleAction;
}(Subscription));
export var idleScheduler = {
    now: function () {
        return asyncScheduler.now();
    },
    schedule: function (work, delay, state) {
        if (delay) {
            return asyncScheduler.schedule(work, delay, state);
        }
        var action = new IdleAction(work);
        var id = requestIdleCallback(function () {
            try {
                work.call(action, state);
            }
            catch (error) {
                action.unsubscribe();
                throw error;
            }
        });
        action.add(function () { return cancelIdleCallback(id); });
        return action;
    }
};
//# sourceMappingURL=idleCallbackScheduler.js.map