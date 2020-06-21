import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DemoBasicsAdapterService } from './demo-basics.adapter.service';

@Component({
  selector: 'demo-basics4-container',
  template: `
    <h1>Solution</h1>
    <small>re-renders: {{ rerenders() }}</small
    ><br />
    <mat-form-field>
      <label>RefreshInterval</label>
      <input
        type="number"
        (input)="refreshIntervalInput$.next($event)"
        matInput
      />
    </mat-form-field>

    <demo-basics
      [refreshInterval]="refreshInterval$ | async"
      (refreshTrigger)="refreshTrigger$.next($event)"
    >
    </demo-basics>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasicsContainerComponent extends RxSubscription {
  refreshTrigger$ = new Subject<any>();
  refreshIntervalInput$ = new Subject<Event>();
  refreshInterval$ = this.refreshIntervalInput$.pipe(
    map((e: any) => e.target.value)
  );

  numRenders = 0;
  rerenders(): number {
    return ++this.numRenders;
  }

  constructor(private ca: DemoBasicsAdapterService) {
    this.ca.connectRefreshTrigger(this.refreshTrigger$);
    this.hold(this.refreshTrigger$, () => this.ca.refetchList());
  }
}
