import { __assign, __extends } from "tslib";
import { asyncScheduler, Subscription } from 'rxjs';
import { isObject } from 'util';
/**
 *
 * Implementation based on rxjs-etc => IdleScheduler
 *
 */
export var PostTaskSchedulerPriority;
(function (PostTaskSchedulerPriority) {
    PostTaskSchedulerPriority["background"] = "background";
    PostTaskSchedulerPriority["userBlocking"] = "user-blocking";
    PostTaskSchedulerPriority["userVisible"] = "user-visible";
})(PostTaskSchedulerPriority || (PostTaskSchedulerPriority = {}));
export var postTaskScheduler = typeof window !== 'undefined'
    ? window.scheduler || {
        postTask: function (options) {
            var start = Date.now();
            return new Promise(function (resolve) {
                setTimeout(function () {
                    console.error('postTask not implemented. Use setTimeout as fallback');
                    resolve();
                }, 1);
            });
        }
    }
    : function () { };
var PostTaskAction = /** @class */ (function (_super) {
    __extends(PostTaskAction, _super);
    function PostTaskAction(work) {
        var _this = _super.call(this) || this;
        _this.work = work;
        return _this;
    }
    PostTaskAction.prototype.schedule = function (state, delay) {
        if (this.closed) {
            return this;
        }
        return this._scheduler.schedule(this.work, delay, state);
    };
    return PostTaskAction;
}(Subscription));
export function getPostTaskScheduler(priority) {
    return {
        now: function () {
            return asyncScheduler.now();
        },
        schedule: function (work, options, state) {
            if (options === void 0) { options = {}; }
            if (isObject(options) && options.delay) {
                return asyncScheduler.schedule(work, options.delay, state);
            }
            options = __assign(__assign({}, options), { priority: priority });
            var action = new PostTaskAction(work);
            // weired hack
            action._scheduler = this;
            var promise = postTaskScheduler
                .postTask(function () { }, options)
                .then(function () {
                try {
                    work.call(action, state);
                }
                catch (error) {
                    action.unsubscribe();
                    throw error;
                }
            });
            action.add(function () {
                throw new Error('not implemented');
            });
            return action;
        }
    };
}
//# sourceMappingURL=getPostTaskScheduler.js.map