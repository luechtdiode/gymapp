import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import { CachedCrudService } from './shared/cached-crud.service';
import { CrudService, authHttpServiceFactory } from './shared/crud.service';
import { AuthHttp } from 'angular2-jwt';

//import * as routes from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './app-state.reducer';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home/home.page.component';
import { ClubMediaComponent } from './club/club-media/club-media.component';
import { SponsorMediaComponent } from './sponsor/sponsor-media/sponsor-media.component';
import { CompetitionMediaComponent } from './competition/competition-media/competition-media.component';
import { CompetitionService } from './competition/competition.service';
import { CompetitionEffects } from './competition/competition.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    CompetitionMediaComponent,
    ClubMediaComponent,
    SponsorMediaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    //RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(CompetitionEffects),
  ],
  providers: [
    CachedCrudService,
    CrudService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    CompetitionService,
    CompetitionEffects
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
