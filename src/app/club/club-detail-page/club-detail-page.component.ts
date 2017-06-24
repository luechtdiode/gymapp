import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, RouterState, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getDetailClub, isMemberOfClub } from '../../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import { Club } from '../../model/backend-typings';
import { loadDetailAction } from '../club.actions';

@Component({
  selector: 'gymapp-club-detail-page',
  templateUrl: './club-detail-page.component.html',
  styleUrls: ['./club-detail-page.component.scss'],
})
export class ClubDetailPageComponent implements OnInit {

  club: Observable<Club>;

  loadingmessage = 'loading ...';
  isClubUser = false;

  constructor(public router: Router, public store: Store<AppState>) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    const clubid = root.firstChild.paramMap.get('clubid');
    store.dispatch(loadDetailAction(clubid));
    this.club = this.store.select(getDetailClub);
    this.store.select(isMemberOfClub).subscribe(club => {
      console.log('isMemberOfClub', club, clubid);
      this.isClubUser = club ? club === clubid : false;
    });
  }

  ngOnInit() {
  }

}
