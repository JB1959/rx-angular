import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DemoBasicsItem } from './demo-basics.view-model.service';
import {
  ListServerItem,
  ListService
} from '../../../data-access/list-resource';

interface ComponentState {
  list: DemoBasicsItem[];
  loadingSignal: boolean;
}

@Injectable()
export class DemoBasicsAdapterService extends RxState<ComponentState> {
  loadingSignal$ = this.select('loadingSignal');
  list$: Observable<DemoBasicsItem[]> = this.select('list');

  constructor(private listService: ListService, private ngRxStore: any) {
    super();

    this.connect('list', this.listService.list$.pipe(map(this.parseListItems)));
    this.connect('loadingSignal', this.listService.loadingSignal$);
  }

  refetchList() {
    this.listService.refetchList();
  }

  connectRefreshTrigger(trigger$: Observable<any>): void {
    this.hold(trigger$, () => this.listService.refetchList());
  }

  parseListItems(l: ListServerItem[]): DemoBasicsItem[] {
    return l.map(({ id, name }) => ({ id, name }));
  }
}
