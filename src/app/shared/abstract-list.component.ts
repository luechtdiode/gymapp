import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/combineLatest';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { Selector } from 'reselect';

export const OTHER_KIND = 'Other';
export const ALL_KINDS = 'All';

export class AbstractListComponent<T> implements OnDestroy {

  protected subscriptions: Subscription[] = [];

  private _items: T[];
  private _kindItems: string[] = [];
  private _selectedTab: string;

  private selectedTabSubject = new Subject<string>();
  private allKindsMap = {};
  private kindsMap = {};
  private itemExtractor: (T) => string[];
  private maxTabs: number;
  private selector: Selector<AppState, T[]>;
  private extraFilter = [];
  private unfilteredItemsObserver: Observable<T[]>;

  constructor(protected store: Store<AppState>) { }

  addExtraFilter(filterFn: (T) => boolean) {
    this.extraFilter.push(filterFn);
    this.reconnect();
  }

  reconnect() {
    this.buildFilterPipeline();
    this.selectedTabSubject.next(this._selectedTab);
  }

  protected connect(selector: Selector<AppState, T[]>, maxTabs: number, extractor: (T) => string[]) {
    this.itemExtractor = extractor;
    this.selectedTabSubject.subscribe(predicate => this._selectedTab = predicate);
    this.selector = selector;
    this.maxTabs = maxTabs;
    this.unfilteredItemsObserver = this.store.select(selector);
    this.buildFilterPipeline();
    this.selectedTabSubject.next(ALL_KINDS);
  }

  private buildFilterPipeline() {
    if (!this.unfilteredItemsObserver) {
      return;
    }
    this.subscriptions.forEach(sub => sub.unsubscribe);
    let filteredItemsObserver = this.unfilteredItemsObserver;
    this.extraFilter.forEach(filterFn => {
       filteredItemsObserver = filteredItemsObserver.map(list => list.filter(filterFn));
    });
    this.subscriptions.push(filteredItemsObserver.subscribe((items) => {
      this.allKindsMap = {};
      items.forEach(item => this.itemExtractor(item).filter(i => i.trim().length > 0).forEach(kind => {
        let kindcnt = this.allKindsMap[kind];
        if (kindcnt === undefined) {
          kindcnt = 1;
        } else {
          kindcnt++;
        }
        this.allKindsMap[kind] = kindcnt;
      }));

      this.kindsMap[ALL_KINDS] = items.length;

      const allkinds = Object.keys(this.allKindsMap)
        .map(key => Object.assign({kind: key, cnt: this.allKindsMap[key] }))
        .sort((a, b) => a.cnt - b.cnt);

      if (allkinds.length <= 1) {
        this._kindItems = [ALL_KINDS];
      } else {
        this._kindItems = [ALL_KINDS, ...allkinds.slice(0, this.maxTabs).map(kind => kind.kind), OTHER_KIND];
      }

      this._kindItems.forEach(item => {
        this.kindsMap[item] = this.getKindCount(item);
      });
    }));

    this.subscriptions.push(Observable.combineLatest(
      filteredItemsObserver,
      this.selectedTabSubject, (items, predicate) => {
        return items.filter(item => this.filter(item, predicate));
      },
    ).subscribe((items) => this._items = items));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  select(kind: string) {
    this.selectedTabSubject.next(kind);
  }

  public get items() {
    return this._items;
  }

  get kindItems(): string[] {
    return this._kindItems;
  }

  get selectedTab(): string {
    return this._selectedTab;
  }

  private getKindCount(kind: string) {
    if (this.kindsMap[kind] !== undefined) {
      return this.kindsMap[kind];
    }
    switch (kind) {
      case ALL_KINDS:
        return Object.keys(this.allKindsMap)
          .map(k => this.allKindsMap[k])
          .reduce((a, b) => a + b, 0);

      case OTHER_KIND:
        return Object.keys(this.allKindsMap)
          .filter(k => this._kindItems.indexOf(k) === -1)
          .map(k => this.allKindsMap[k])
          .reduce((a, b) => a + b, 0);

      default: {
        return this.allKindsMap[kind];
      }
    }
  }

  public isSelected(kind: string) {
    if (!this._kindItems) {
      return false;
    }
    return this._selectedTab === kind;
  }

  private filter(item: T, kind: string): boolean {
    if (!this._kindItems) {
      return true;
    }
    switch (kind) {
      case ALL_KINDS:
        return true;

      case OTHER_KIND:
        return this.itemExtractor(item)
          .filter(k => this._kindItems.indexOf(k) === -1)
          .length > 0;

      default:
        return this.itemExtractor(item)
          .filter(k => kind === k)
          .length > 0;
    }
  }
}
