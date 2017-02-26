import {Action} from '@ngrx/store';
import {Club} from '../model/backend-typings';
import * as club from './club.actions';

export interface ClubsState {
  loaded: boolean;
  loading: boolean;
  clubs: Club[];
  memberOfClub?: Club;
  loadingFeatured: boolean;
  featured: Club;
};

const initialState: ClubsState = {
  loaded: false,
  loading: false,
  clubs: [],
  memberOfClub: undefined,
  loadingFeatured: false,
  featured: undefined,
};

export function reducer(state = initialState, action: Action): ClubsState {
  switch (action.type) {
    case club.ActionTypes.LOAD_CLUBS:
    {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case club.ActionTypes.LOAD_CLUBS_SUCCESS:
    {
      const cs: Club[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        clubs: [...cs].sort((club1, club2): number => {
          return club2.name.localeCompare(club1.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case club.ActionTypes.LOAD_FEATURED_CLUB:
    {
      return Object.assign({}, state, {
        loadingFeatured: true,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case club.ActionTypes.LOAD_FEATURED_CLUB_FAIL:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case club.ActionTypes.LOAD_FEATURED_CLUB_SUCCESS:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: action.payload,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case club.ActionTypes.LOAD_CLUB_SUCCESS:
    {
      return Object.assign({}, state, {
        memberOfClub: action.payload,
        featured: action.payload,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case club.ActionTypes.SAVE_CLUB_SUCCESS:
    case club.ActionTypes.DELETE_CLUB_FAIL:
    {
      return Object.assign({}, state, {
        loading: true,
        clubs: [
          ...state.clubs.filter(club => club._id !== action.payload._id),
          action.payload,
        ].sort((club1, club2): number => {
          return club2.name.localeCompare(club1.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case club.ActionTypes.DELETE_CLUB_SUCCESS:
    case club.ActionTypes.SAVE_CLUB_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.clubs.filter(club => club._id !== club._id),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    default:
    {
      return state;
    }
  }
}

export const getClubs = (state: ClubsState) => state.clubs;
export const getMemberOfClub = (state: ClubsState) => state.memberOfClub;
export const getIds = (state: ClubsState) => getClubs(state).map(c => c._id);

export const isLoaded = (state: ClubsState) => state.loaded;
export const isLoading = (state: ClubsState) => state.loading;

export const getFeatured = (state: ClubsState) => state.featured;
export const isLoadingFeatured = (state: ClubsState) => state.loadingFeatured;
