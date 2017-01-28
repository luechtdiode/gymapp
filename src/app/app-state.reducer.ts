import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { gwtoken, backUrl } from './shared/auth.reducer';
import { environment } from '../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromCompetitions from './competition/competition.reducer';
import * as fromClubs from './club/club.reducer';
import * as fromAuth from './shared/auth.reducer';


/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

export interface AppState {
  competitions: fromCompetitions.CompetitionsState;
  clubs: fromClubs.ClubsState;
  auth: fromAuth.AuthState;
  router: fromRouter.RouterState;
}

const reducers = {
  competitions: fromCompetitions.reducer,
  clubs: fromClubs.reducer,
  auth: fromAuth.reducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const activeRoute = (state: AppState) => state.router;
export const getAuthState = (state: AppState) => state.auth;
export const isLoggedIn = createSelector(getAuthState, fromAuth.isLoggedIn);
export const isMemberOfClub = createSelector(getAuthState, fromAuth.isMemberOfClub);
export const isMemberOfSponsor = createSelector(getAuthState, fromAuth.isMemberOfSponsor);
export const getUsername = createSelector(getAuthState, fromAuth.username);
export const getGWToken = createSelector(getAuthState, fromAuth.gwtoken);
export const getBackUrl = createSelector(getAuthState, fromAuth.backUrl);

export const getCompetitionsState = (state: AppState) => state.competitions;
export const getCompetitions = createSelector(getCompetitionsState, fromCompetitions.getCompetitions);
export const getFeaturedCompetition = createSelector(getCompetitionsState, fromCompetitions.getFeatured);
export const isLoadingFeaturedCompetition = createSelector(getCompetitionsState, fromCompetitions.isLoadingFeatured);

export const getClubsState = (state: AppState) => state.clubs;
export const getClubs = createSelector(getClubsState, fromClubs.getClubs);
export const getFeaturedClub = createSelector(getClubsState, fromClubs.getFeatured);
export const isLoadingFeaturedClub = createSelector(getClubsState, fromClubs.isLoadingFeatured);
