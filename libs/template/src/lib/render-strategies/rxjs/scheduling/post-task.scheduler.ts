import { from, Subscription } from 'rxjs';

declare const scheduler;
const rxPostTaskScheduler = {
  now: () => {
    return 0;
  },
  schedule: (work: () => void, options?: any, ...state): Subscription => {
    return from(scheduler.postTask(options)).subscribe(() => work());
  }
};
