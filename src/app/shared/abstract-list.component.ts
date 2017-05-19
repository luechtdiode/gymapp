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

  private items: T[];
  private kindItems: string[] = [];
  private selectedTabSubject = new Subject<string>();
  private selectedTab: string;
  private allKindsMap = {};
  private kindsMap = {};
  private itemExtractor: (T) => string[];

  constructor(protected store: Store<AppState>) { }

  protected connect(selector: Selector<AppState, T[]>, maxTabs: number, extractor: (T) => string[]) {
    this.itemExtractor = extractor;
    this.subscriptions.push(this.selectedTabSubject.subscribe(predicate => this.selectedTab = predicate));

    const unfilteredItems = this.store.select(selector);
    this.subscriptions.push(unfilteredItems.subscribe((items) => {
      this.allKindsMap = {};
      items.forEach(item => extractor(item).forEach(kind => {
        let kindcnt = this.allKindsMap[kind];
        if (kindcnt === undefined) {
          kindcnt = 1;
        } else {
          kindcnt++;
        }
        this.allKindsMap[kind] = kindcnt;
      }));
      if (Object.keys(this.allKindsMap).length === 0) {
        this.kindsMap[ALL_KINDS] = items.length;
      }
      const allkinds = Object.keys(this.allKindsMap)
        .map(key => Object.assign({kind: key, cnt: this.allKindsMap[key] }))
        .sort((a, b) => a.cnt - b.cnt);
      this.kindItems = [ALL_KINDS, ...allkinds.slice(0, maxTabs).map(kind => kind.kind), OTHER_KIND];
      this.kindItems.forEach(item => {
        this.kindsMap[item] = this.getKindCount(item);
      });
    }));

    this.subscriptions.push(Observable.combineLatest(
      unfilteredItems, this.selectedTabSubject,
      (items, predicate) => {
        const ret = items.filter(item => this.filter(item, predicate));
        return ret;
      },
    ).subscribe(items => this.items = items));

    this.selectedTabSubject.next(ALL_KINDS);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  select(kind: string) {
    this.selectedTabSubject.next(kind);
  }

  private getKindCount(kind: string) {
    if (this.kindsMap[kind]) {
      return this.kindsMap[kind];
    }
    switch (kind) {
      case ALL_KINDS:
        return Object.keys(this.allKindsMap)
          .map(k => this.allKindsMap[k])
          .concat([0]) // prevent emtpy array to reduce
          .reduce((a, b) => a + b);

      case OTHER_KIND:
        return Object.keys(this.allKindsMap)
          .filter(k => this.kindItems.indexOf(k) === -1)
          .map(k => this.allKindsMap[k])
          .concat([0]) // prevent emtpy array to reduce
          .reduce((a, b) => a + b);

      default: {
        return this.allKindsMap[kind];
      }
    }
  }

  public isSelected(kind: string) {
    if (!this.kindItems) {
      return false;
    }
    return this.selectedTab === kind;
  }

  private filter(item: T, kind: string): boolean {
    if (!this.kindItems) {
      return true;
    }
    switch (kind) {
      case ALL_KINDS:
        return true;

      case OTHER_KIND:
        return this.itemExtractor(item)
          .filter(k => this.kindItems.indexOf(k) === -1)
          .length > 0;

      default:
        return this.itemExtractor(item)
          .filter(k => kind === k)
          .length > 0;
    }
  }
}
