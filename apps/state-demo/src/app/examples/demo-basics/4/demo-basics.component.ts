import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output
} from '@angular/core';
import { DemoBasicsViewModelService } from './demo-basics.view-model.service';
import { DemoBasicsAdapterService } from './demo-basics.adapter.service';

@Component({
  selector: 'demo-basics',
  templateUrl: './demo-basics.view.html',
  styles: [
    `
      .list .mat-expansion-panel-header {
        position: relative;
      }

      .list .mat-expansion-panel-header mat-progress-bar {
        position: absolute;
        top: 0px;
        left: 0;
      }

      .list .mat-expansion-panel-content .mat-expansion-panel-body {
        padding-top: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DemoBasicsViewModelService, DemoBasicsAdapterService]
})
export class DemoBasicsComponent {
  @Input()
  set refreshInterval(refreshInterval: number) {
    this.vm.set({ refreshInterval });
  }

  @Output()
  refreshTrigger = this.vm.refreshListSideEffect$;

  numRenders = 0;

  rerenders(): number {
    return ++this.numRenders;
  }

  constructor(public vm: DemoBasicsViewModelService) {}
}
