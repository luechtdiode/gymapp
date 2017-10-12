import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { gwtoken, backUrl } from './shared/auth.reducer';
import { environment } from '../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromCompetitions from './competition/competition.reducer';
import * as fromClubs from './club/club.reducer';
import * as fromSponsors from './sponsor/sponsor.reducer';
import * as fromAuth from './shared/auth.reducer';
import * as fromActions from './actions/actions.reducer';


/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers, ActionReducerMap } from '@ngrx/store';
import { SponsorsState } from './sponsor/sponsor.reducer';
import { isLoadingDetail } from './competition/competition.reducer';

export interface AppState {
  competitions: fromCompetitions.CompetitionsState;
  clubs: fromClubs.ClubsState;
  sponsors: fromSponsors.SponsorsState;
  auth: fromAuth.AuthState;
  router: fromRouter.RouterReducerState;
  actions: fromActions.ActionsState;
}

export const reducers: ActionReducerMap<AppState> = {
  competitions: fromCompetitions.reducer,
  clubs: fromClubs.reducer,
  sponsors: fromSponsors.reducer,
  auth: fromAuth.reducer,
  router: fromRouter.routerReducer,
  actions: fromActions.reducer,
};

export const activeRoute = (state: AppState) => state.router;
export const getAuthState = (state: AppState) => state.auth;
export const isLoggedIn = createSelector(getAuthState, fromAuth.isLoggedIn);
export const isMemberOfClub = createSelector(getAuthState, fromAuth.isMemberOfClub);
export const isMemberOfSponsor = createSelector(getAuthState, fromAuth.isMemberOfSponsor);
export const getUsername = createSelector(getAuthState, fromAuth.username);
export const getGWToken = createSelector(getAuthState, fromAuth.gwtoken);
export const getBackUrl = createSelector(getAuthState, fromAuth.backUrl);
export const getProfile = createSelector(getAuthState, fromAuth.getProfile);
export const getUser = createSelector(getAuthState, fromAuth.getUser);

export const getCompetitionsState = (state: AppState) => state.competitions;
export const getCompetitions = createSelector(getCompetitionsState, fromCompetitions.getCompetitions);
export const isLoadingCompetitions = createSelector(getCompetitionsState, fromCompetitions.isLoading);
export const getFeaturedCompetition = createSelector(getCompetitionsState, fromCompetitions.getFeatured);
export const isLoadingFeaturedCompetition = createSelector(getCompetitionsState, fromCompetitions.isLoadingFeatured);
export const getCompetition = createSelector(getCompetitionsState, fromCompetitions.getCompetition);
export const isLoadingCompetition = createSelector(getCompetitionsState, fromCompetitions.isLoadingDetail);
export const isCompetitionsLoadingOrLoaded = createSelector(getCompetitionsState, fromCompetitions.isLoadingOrLoaded);

export const getClubsState = (state: AppState) => state.clubs;
export const getClubs = createSelector(getClubsState, fromClubs.getClubs);
export const isLoadingClub = createSelector(getClubsState, fromClubs.isLoading);
export const getMemberOfClub = createSelector(getClubsState, fromClubs.getMemberOfClub);
export const getFeaturedClub = createSelector(getClubsState, fromClubs.getFeatured);
export const isLoadingFeaturedClub = createSelector(getClubsState, fromClubs.isLoadingFeatured);
export const getDetailClub = createSelector(getClubsState, fromClubs.getDetailClub);

export const getSponsorsState = (state: AppState) => state.sponsors;
export const getSponsors = createSelector(getSponsorsState, fromSponsors.getSponsors);
export const getMemberOfSponsor = createSelector(getSponsorsState, fromSponsors.getMemberOfSponsor);
export const isLoadingSponsors = createSelector(getSponsorsState, fromSponsors.isLoading);
export const getFeaturedSponsor = createSelector(getSponsorsState, fromSponsors.getFeatured);
export const isLoadingFeaturedSponsor = createSelector(getSponsorsState, fromSponsors.isLoadingFeatured);
export const getDetailSponsor = createSelector(getSponsorsState, fromSponsors.getDetail);
export const isLoadingDetailSponsor = createSelector(getSponsorsState, fromSponsors.isLoadingDetail);

export const getActionsState = (state: AppState) => state.actions;
export const getSponsorActions = createSelector(getActionsState, fromActions.getSponsorActions);
