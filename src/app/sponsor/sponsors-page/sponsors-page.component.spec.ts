import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SponsorsPageComponent } from './sponsors-page.component';
import { SponsorListComponent } from '../sponsor-list/sponsor-list.component';
import { SponsorMediaComponent } from '../sponsor-media/sponsor-media.component';
import { Store, Action, StoreModule } from '@ngrx/store';
import { AppState, reducers } from '../../app-state.reducer';
import { Sponsor } from '../../model/backend-typings';
import { Observable } from 'rxjs/Observable';

describe('SponsorsPageComponent', () => {
  let component: SponsorsPageComponent;
  let fixture: ComponentFixture<SponsorsPageComponent>;
  const sponsorListStub: Sponsor[] = [
    <Sponsor>{
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: undefined,
      sponsoractions: [],
    },
  ];
  const storeStub: Store<AppState> = <Store<AppState>>{
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      return Observable.of(sponsorListStub);
    },
    dispatch: (action: Action) => {
      console.log('dispatching ', action);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorsPageComponent, SponsorListComponent, SponsorMediaComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeStub },
      ],
      imports: [
        StoreModule.forRoot({ reducers }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

});
