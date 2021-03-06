import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RequestOptions } from '@angular/http';
import { CrudService } from './shared/crud.service';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './app-state.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { LocalStorageService } from './shared/local-storage.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home/home-page.component';
import { ClubMediaComponent } from './club/club-media/club-media.component';
import { SponsorMediaComponent } from './sponsor/sponsor-media/sponsor-media.component';
import { CompetitionMediaComponent } from './competition/competition-media/competition-media.component';
import { CompetitionService } from './competition/competition.service';
import { CompetitionEffects } from './competition/competition.effects';
import { CompetitionListComponent } from './competition/competition-list/competition-list.component';
import { CompetitionsPageComponent } from './competition/competitions-page/competitions-page.component';
import { ClubsPageComponent } from './club/clubs-page/clubs-page.component';
import { SponsorsPageComponent } from './sponsor/sponsors-page/sponsors-page.component';
import { AboutusPageComponent } from './about/aboutus-page/aboutus-page.component';
import { ContactPageComponent } from './contact/contact-page/contact-page.component';
import { AuthService } from './shared/auth.service';
import { AuthEffects } from './shared/auth.effects';
import { LoginComponent } from './login/login.component';
import { ClubEffects } from './club/club.effects';
import { ClubService } from './club/club.service';
import { SponsorEffects } from './sponsor/sponsor.effects';
import { SponsorService } from './sponsor/sponsor.service';
import { ClubListComponent } from './club/club-list/club-list.component';
import { SponsorListComponent } from './sponsor/sponsor-list/sponsor-list.component';
import { EditClubPageComponent } from './club/edit-club-page/edit-club-page.component';
import { ClubFormComponent } from './club/club-form/club-form.component';
import { RegisterClubPageComponent } from './club/register-club-page/register-club-page.component';
import { RegisterUserFormComponent } from './login/register-user-form/register-user-form.component';
import { UrlProvider } from './shared/urlProvider';
import { IsClubUserGuardGuard } from './club/is-club-user-guard.guard';
import { EditSponsorPageComponent } from './sponsor/edit-sponsor-page/edit-sponsor-page.component';
import { IsSponsorUserGuardGuard } from './sponsor/is-sponsor-user-guard.guard';
import { RegisterSponsorPageComponent } from './sponsor/register-sponsor-page/register-sponsor-page.component';
import { SponsorFormComponent } from './sponsor/sponsor-form/sponsor-form.component';
import { SponsorActionFormComponent } from './sponsor/sponsor-action-form/sponsor-action-form.component';
import { ActionsService } from './actions/actions.service';
import { ActionsEffects } from './actions/actions.effects';
// import { CurrencyFormatDirective } from './shared/currency-format.directive';
import { SplitCurrency } from './shared/split-currency.pipe';
import { CompetitionDetailPageComponent } from './competition/competition-detail-page/competition-detail-page.component';
import { ClubDetailPageComponent } from './club/club-detail-page/club-detail-page.component';
import { SponsorDetailPageComponent } from './sponsor/sponsor-detail-page/sponsor-detail-page.component';
import { CompetitionsLoadedGuard } from './competition/competitions-loaded.guard';
import { CompetitionFormComponent } from './competition/competition-form/competition-form.component';
import { CreateCompetitionPageComponent } from './competition/create-competition-page/create-competition-page.component';
import { CompetitionActionFormComponent } from './competition/competition-action-form/competition-action-form.component';
import { EditCompetitionPageComponent } from './competition/edit-competition-page/edit-competition-page.component';
import { environment } from '../environments/environment';
import { EditProfilePageComponent } from './login/edit-profile-page/edit-profile-page.component'; // Angular CLI environment
import { IsLoggedInGuard } from './login/is-logged-in-guard.guard';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

// see https://stackoverflow.com/questions/39287444/angular2-how-to-get-app-base-href-programatically
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

declare var sessionStorage: any;
export function tokenGetter() {
  return sessionStorage.getItem('x-access-token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,

    CompetitionMediaComponent,
    CompetitionListComponent,
    CompetitionsPageComponent,

    ClubMediaComponent,
    ClubsPageComponent,
    ClubListComponent,
    ClubFormComponent,
    RegisterClubPageComponent,
    EditClubPageComponent,

    SponsorMediaComponent,
    SponsorsPageComponent,
    SponsorListComponent,
    SponsorFormComponent,
    SponsorActionFormComponent,
    RegisterSponsorPageComponent,
    EditSponsorPageComponent,

    AboutusPageComponent,
    ContactPageComponent,
    LoginComponent,
    RegisterUserFormComponent,
    // CurrencyFormatDirective,
    SplitCurrency,
    CompetitionDetailPageComponent,
    ClubDetailPageComponent,
    SponsorDetailPageComponent,
    CompetitionFormComponent,
    CreateCompetitionPageComponent,
    CompetitionActionFormComponent,
    EditCompetitionPageComponent,
    EditProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'x-access-token',
        whitelistedDomains: ['localhost', '*.sharevic.net'],
        blacklistedRoutes: [],
      },
    }),
    StoreModule.forRoot(reducers),
    RouterModule.forRoot(appRoutes, { useHash: true }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    EffectsModule.forRoot([ActionsEffects
      , AuthEffects
      , CompetitionEffects
      , ClubEffects
      , SponsorEffects]),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation],
    },
    UrlProvider,
    CrudService,
    LocalStorageService,
    AuthService,
    CompetitionService,
    CompetitionEffects,
    ClubService,
    ClubEffects,
    SponsorService,
    SponsorEffects,
    IsLoggedInGuard,
    IsClubUserGuardGuard,
    IsSponsorUserGuardGuard,
    CompetitionsLoadedGuard,
    ActionsService,
    ActionsEffects,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
