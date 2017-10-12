import { Routes, ActivatedRoute } from '@angular/router';
import { HomePageComponent } from './home/home-page.component';
import { CompetitionsPageComponent } from './competition/competitions-page/competitions-page.component';
import { AboutusPageComponent } from './about/aboutus-page/aboutus-page.component';
import { ClubsPageComponent } from './club/clubs-page/clubs-page.component';
import { SponsorsPageComponent } from './sponsor/sponsors-page/sponsors-page.component';
import { ContactPageComponent } from './contact/contact-page/contact-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterClubPageComponent } from './club/register-club-page/register-club-page.component';
import { EditClubPageComponent } from './club/edit-club-page/edit-club-page.component';
import { flatten } from './shared/collection-util';
import { Action } from '@ngrx/store';
import { IsClubUserGuardGuard } from './club/is-club-user-guard.guard';
import { RegisterSponsorPageComponent } from './sponsor/register-sponsor-page/register-sponsor-page.component';
import { EditSponsorPageComponent } from './sponsor/edit-sponsor-page/edit-sponsor-page.component';
import { IsSponsorUserGuardGuard } from './sponsor/is-sponsor-user-guard.guard';
import { CompetitionDetailPageComponent } from './competition/competition-detail-page/competition-detail-page.component';
import { ClubDetailPageComponent } from './club/club-detail-page/club-detail-page.component';
import { SponsorDetailPageComponent } from './sponsor/sponsor-detail-page/sponsor-detail-page.component';
import { CompetitionsLoadedGuard } from './competition/competitions-loaded.guard';
import { CreateCompetitionPageComponent } from './competition/create-competition-page/create-competition-page.component';
import { EditCompetitionPageComponent } from './competition/edit-competition-page/edit-competition-page.component';
import { RouterPath } from './router-path';
import { IsLoggedInGuard } from './login/is-logged-in-guard.guard';
import { EditProfilePageComponent } from './login/edit-profile-page/edit-profile-page.component';

export function composeRoute(toPath: string, activeRoute: ActivatedRoute): string[] {
    const activePath: string[][] = activeRoute.snapshot.pathFromRoot
        .map(p => p.url.toString())
        .filter(e => e !== '')
        .map(segment => segment.split(','));

    let result: string[] = flatten(activePath);
    if (!toPath.startsWith('/')) {
      toPath.split('/')
        .filter(toPathElement => toPathElement !== '' && toPathElement !== '.')
        .forEach(toPathElement => {
            if (toPathElement === '..' && result.length > 1) {
                // navigate up
                result = result.slice(0, result.length - 1);
            } else {
                // navigate down
                result.push(toPathElement);
            }
        });
    }

    return result;
}

export function goRelative(toRelativePath: string, activeRoute: ActivatedRoute): string[] {
    // go(toRelativePath, '', { relativeTo: activeRoute}) doesn't work when store freezes it's content (bug)
    // (https://github.com/codewareio/ngrx-store-freeze/issues/5)
    // so we have to work around it ...
    if (toRelativePath.startsWith('/')) {
        throw new Error('absolute paths not supported: ' + toRelativePath);
    }
    return composeRoute(toRelativePath, activeRoute);
}

export const appRoutes: Routes = [
  { path: '', redirectTo: RouterPath.HOME, pathMatch: 'full' },
  { path: RouterPath.HOME, component: HomePageComponent },
  { path: RouterPath.ABOUT, component: AboutusPageComponent },
  { path: RouterPath.COMPETITIONS, component: CompetitionsPageComponent/*, canActivate: [CompetitionsLoadedGuard]*/ },
  { path: RouterPath.COMPETITION_DETAILS, component: CompetitionDetailPageComponent/*, canActivate: [CompetitionsLoadedGuard]*/ },
  { path: RouterPath.CREATE_COMPETITION, component: CreateCompetitionPageComponent },
  { path: RouterPath.COMPETITION_EDIT, component: EditCompetitionPageComponent },
  { path: RouterPath.CLUBS, component: ClubsPageComponent },
  { path: RouterPath.CLUB_DETAILS, component: ClubDetailPageComponent },
  { path: RouterPath.SPONSORS, component: SponsorsPageComponent },
  { path: RouterPath.SPONSOR_DETAILS, component: SponsorDetailPageComponent},
  { path: RouterPath.CONTACT, component: ContactPageComponent },
  { path: RouterPath.LOGIN, component: LoginComponent },
  { path: RouterPath.CLUBPROFILE, component: EditClubPageComponent, canActivate: [IsClubUserGuardGuard]},
  { path: RouterPath.REGISTER_CLUB, component: RegisterClubPageComponent},
  { path: RouterPath.SPONSORPROFILE, component: EditSponsorPageComponent, canActivate: [IsSponsorUserGuardGuard]},
  { path: RouterPath.REGISTER_SPONSOR, component: RegisterSponsorPageComponent},
  { path: RouterPath.PROFILE, component: EditProfilePageComponent, canActivate: [IsLoggedInGuard]},
  { path: RouterPath.PROFILE + '/:token', component: EditProfilePageComponent, canActivate: [IsLoggedInGuard]},
  { path: '**', redirectTo: RouterPath.HOME },
];
