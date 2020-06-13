import { from, Subscription } from 'rxjs';
import { getUnpatchedResolvedPromise } from '@rx-angular/template';

const rxAsapScheduler = {
  now: () => {
    return 0;
  },
  schedule: (
    work: (...args: any[]) => void,
    options?: number,
    state?: any
  ): Subscription => {
    return from(getUnpatchedResolvedPromise()).subscribe(() => work(state));
  }
};
