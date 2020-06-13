import { bindCallback, Subscription } from 'rxjs';

type RequestIdleCallbackHandle = any;

interface RequestIdleCallbackOptions {
  timeout: number;
}

interface RequestIdleCallbackDeadline {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
}

type RequestIdleCallback = (
  callback: (deadline: RequestIdleCallbackDeadline) => void,
  opts?: RequestIdleCallbackOptions
) => RequestIdleCallbackHandle;

const requestIdleCallback: RequestIdleCallback =
  typeof window !== 'undefined'
    ? (window as any).requestIdleCallback ||
      function(cb: Function) {
        const start = Date.now();
        return setTimeout(function() {
          cb({
            didTimeout: false,
            timeRemaining: function() {
              return Math.max(0, 50 - (Date.now() - start));
            }
          });
        }, 1);
      }
    : () => {};

const getRequestIdleCallbackObservable = bindCallback(requestIdleCallback);
const rxRequestIdleCallbackScheduler = {
  now: () => {
    return 0;
  },
  schedule: (work: () => void, options?: any, ...state): Subscription => {
    return getRequestIdleCallbackObservable().subscribe(() => work());
  }
};
