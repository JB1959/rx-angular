import { asyncScheduler, Subscription } from 'rxjs';
export const cancelIdleCallback = typeof window !== 'undefined'
    ? window.cancelIdleCallback ||
        function (idleId) {
            console.warn('Fake cancelIdleCallback used');
            clearTimeout(idleId);
        }
    : () => { };
export const requestIdleCallback = typeof window !== 'undefined'
    ? window.requestIdleCallback ||
        function (cb) {
            console.warn('Fake requestIdleCallback used');
            const start = Date.now();
            return setTimeout(function () {
                cb({
                    didTimeout: false,
                    timeRemaining: function () {
                        return Math.max(0, 50 - (Date.now() - start));
                    }
                });
            }, 1);
        }
    : () => { };
class IdleAction extends Subscription {
    constructor(work) {
        super();
        this.work = work;
    }
    schedule(state, delay) {
        if (this.closed) {
            return this;
        }
        return idleScheduler.schedule(this.work, delay, state);
    }
}
export const idleScheduler = {
    now() {
        return asyncScheduler.now();
    },
    schedule(work, delay, state) {
        if (delay) {
            return asyncScheduler.schedule(work, delay, state);
        }
        const action = new IdleAction(work);
        const id = requestIdleCallback(() => {
            try {
                work.call(action, state);
            }
            catch (error) {
                action.unsubscribe();
                throw error;
            }
        });
        action.add(() => cancelIdleCallback(id));
        return action;
    }
};
//# sourceMappingURL=idleCallbackScheduler.js.map