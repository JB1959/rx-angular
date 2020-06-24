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
export const postTaskScheduler = typeof window !== 'undefined'
    ? window.scheduler || {
        postTask(options) {
            const start = Date.now();
            return new Promise(resolve => {
                setTimeout(function () {
                    console.error('postTask not implemented. Use setTimeout as fallback');
                    resolve();
                }, 1);
            });
        }
    }
    : () => { };
class PostTaskAction extends Subscription {
    constructor(work) {
        super();
        this.work = work;
    }
    schedule(state, delay) {
        if (this.closed) {
            return this;
        }
        return this._scheduler.schedule(this.work, delay, state);
    }
}
export function getPostTaskScheduler(priority) {
    return {
        now() {
            return asyncScheduler.now();
        },
        schedule(work, options = {}, state) {
            if (isObject(options) && options.delay) {
                return asyncScheduler.schedule(work, options.delay, state);
            }
            options = Object.assign(Object.assign({}, options), { priority });
            const action = new PostTaskAction(work);
            // weired hack
            action._scheduler = this;
            const promise = postTaskScheduler
                .postTask(() => { }, options)
                .then(() => {
                try {
                    work.call(action, state);
                }
                catch (error) {
                    action.unsubscribe();
                    throw error;
                }
            });
            action.add(() => {
                throw new Error('not implemented');
            });
            return action;
        }
    };
}
//# sourceMappingURL=getPostTaskScheduler.js.map