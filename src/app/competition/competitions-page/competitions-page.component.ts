import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadAllAction } from '../competition.actions';
import { AppState } from '../../app-state.reducer';

@Component({
  selector: 'gymapp-competitions-page',
  templateUrl: './competitions-page.component.html',
  styleUrls: ['./competitions-page.component.scss'],
})
export class CompetitionsPageComponent implements OnInit {

  constructor(protected store: Store<AppState>) {
    // this.store.dispatch(loadAllAction());
  }

  ngOnInit() {
  }

}
