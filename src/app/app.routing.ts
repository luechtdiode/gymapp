import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home.page.component';
import { CompetitionsPageComponent } from './competition/competitions-page/competitions-page.component';
import { AboutusPageComponent } from './about/aboutus-page/aboutus-page.component';
import { ClubsPageComponent } from './club/clubs-page/clubs-page.component';
import { SponsorsPageComponent } from './sponsor/sponsors-page/sponsors-page.component';
import { ContactPageComponent } from './contact/contact-page/contact-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterClubPageComponent } from './club/register-club-page/register-club-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'aboutus', component: AboutusPageComponent },
  { path: 'competitions', component: CompetitionsPageComponent },
  { path: 'clubs', component: ClubsPageComponent },
  { path: 'login/registerclub', component: RegisterClubPageComponent},
  { path: 'sponsors', component: SponsorsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginComponent },
];
