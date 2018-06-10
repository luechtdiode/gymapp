/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home/home-page.component';
import { ClubMediaComponent } from './club/club-media/club-media.component';
import { SponsorMediaComponent } from './sponsor/sponsor-media/sponsor-media.component';
import { CompetitionMediaComponent } from './competition/competition-media/competition-media.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { AppState } from './app-state.reducer';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlProvider } from './shared/urlProvider';
import { appRoutes } from './app.routing';
import { AboutusPageComponent } from './about/aboutus-page/aboutus-page.component';
import { CompetitionsPageComponent } from './competition/competitions-page/competitions-page.component';
import { ClubsPageComponent } from './club/clubs-page/clubs-page.component';
import { SponsorsPageComponent } from './sponsor/sponsors-page/sponsors-page.component';
import { ContactPageComponent } from './contact/contact-page/contact-page.component';
import { LoginComponent } from './login/login.component';
import { EditClubPageComponent } from './club/edit-club-page/edit-club-page.component';
import { RegisterClubPageComponent } from './club/register-club-page/register-club-page.component';
import { APP_BASE_HREF } from '@angular/common';
import { EditSponsorPageComponent } from './sponsor/edit-sponsor-page/edit-sponsor-page.component';
import { RegisterSponsorPageComponent } from './sponsor/register-sponsor-page/register-sponsor-page.component';
import { SponsorFormComponent } from './sponsor/sponsor-form/sponsor-form.component';
import { SplitCurrency } from './shared/split-currency.pipe';
import { ClubDetailPageComponent } from './club/club-detail-page/club-detail-page.component';
import { SponsorDetailPageComponent } from './sponsor/sponsor-detail-page/sponsor-detail-page.component';
import { CompetitionDetailPageComponent } from './competition/competition-detail-page/competition-detail-page.component';
import { CreateCompetitionPageComponent } from './competition/create-competition-page/create-competition-page.component';
import { EditCompetitionPageComponent } from './competition/edit-competition-page/edit-competition-page.component';
import { EditProfilePageComponent } from './login/edit-profile-page/edit-profile-page.component';
import { AuthService } from './shared/auth.service';

describe('AppComponent', () => {

  const storeStub: Store<AppState> = <Store<AppState>> {
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      return of(false);
    },
    dispatch: (action: Action) => {
      console.log('dispatching ', action);
    },
  };

  const urlProviderStub = {
    activeLocation: () => {},
    originHRef: {},
  };

  const activatedRouteStub = <ActivatedRoute> {
    parent: <ActivatedRoute> {
      snapshot: {},
    },
    snapshot: {},
  };
  const authProviderStub = {

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomePageComponent,
        ClubMediaComponent,
        ClubsPageComponent,
        SponsorMediaComponent,
        SponsorsPageComponent,
        CompetitionMediaComponent,
        CompetitionsPageComponent,
        AboutusPageComponent,
        ContactPageComponent,
        LoginComponent,
        EditClubPageComponent,
        RegisterClubPageComponent,
        SponsorFormComponent,
        EditSponsorPageComponent,
        RegisterSponsorPageComponent,
        SplitCurrency,
        ClubDetailPageComponent,
        CompetitionDetailPageComponent,
        SponsorDetailPageComponent,
        CreateCompetitionPageComponent,
        EditCompetitionPageComponent,
        EditProfilePageComponent,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'},
        { provide: AuthService, useValue: authProviderStub },
        { provide: UrlProvider, useValue: urlProviderStub },
        { provide: Store, useValue: storeStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        SplitCurrency,
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a gymapp-header tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('gymapp-header')).toBeDefined();
  }));

  it('should render title in a gymapp-footer tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('gymapp-footer')).toBeDefined();
  }));
});
