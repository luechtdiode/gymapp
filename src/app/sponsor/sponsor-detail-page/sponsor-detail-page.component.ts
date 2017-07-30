import { Component, OnInit } from '@angular/core';
import { isMemberOfSponsor, AppState, getDetailSponsor } from '../../app-state.reducer';
import { RouterState, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LoadDetailAction } from '../sponsor.actions';
import { Sponsor } from '../../model/backend-typings';

@Component({
  selector: 'gymapp-sponsor-detail-page',
  templateUrl: './sponsor-detail-page.component.html',
  styleUrls: ['./sponsor-detail-page.component.scss'],
})
export class SponsorDetailPageComponent implements OnInit {

  sponsor: Observable<Sponsor>;

  loadingmessage = 'loading ...';
  isSponsorUser = false;

  constructor(public router: Router, public store: Store<AppState>) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    const sponsorid = root.firstChild.paramMap.get('sponsorid');
    store.dispatch(new LoadDetailAction(sponsorid));
    this.sponsor = this.store.select(getDetailSponsor);
    this.store.select(isMemberOfSponsor).subscribe(sponsor => {
      this.isSponsorUser = sponsor ? sponsor === sponsorid : false;
    });
  }
  ngOnInit() {
  }

}
