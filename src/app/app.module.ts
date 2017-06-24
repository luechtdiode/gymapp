import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import { CachedCrudService } from './shared/cached-crud.service';
import { CrudService, authHttpServiceFactory } from './shared/crud.service';
import { AuthHttp } from 'angular2-jwt';

import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './app-state.reducer';
import { RouterStoreModule } from '@ngrx/router-store';
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    RouterModule.forRoot(appRoutes),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ActionsEffects),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(CompetitionEffects),
    EffectsModule.run(ClubEffects),
    EffectsModule.run(SponsorEffects),
  ],
  providers: [
    UrlProvider,
    CachedCrudService,
    CrudService,
    LocalStorageService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions],
    },
    CompetitionService,
    CompetitionEffects,
    ClubService,
    ClubEffects,
    SponsorService,
    SponsorEffects,
    IsClubUserGuardGuard,
    IsSponsorUserGuardGuard,
    ActionsService,
    ActionsEffects,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
