import {Action} from '@ngrx/store';
import {Club} from '../model/backend-typings';
import * as clubActions from './club.actions';

export interface ClubsState {
  loaded: boolean;
  loading: boolean;
  clubs: Club[];
  memberOfClub?: Club;
  loadingFeatured: boolean;
  featured: Club;
  loadingDetail: boolean;
  club: Club;
};

const initialState: ClubsState = {
  loaded: false,
  loading: false,
  clubs: [],
  memberOfClub: undefined,
  loadingFeatured: false,
  featured: undefined,
  loadingDetail: false,
  club: undefined,
};

export function reducer(state = initialState, action: clubActions.Actions): ClubsState {
  switch (action.type) {
    case clubActions.LOAD_CLUBS:
    {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_CLUBS_SUCCESS:
    {
      const cs: Club[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        clubs: [...cs].sort((club1, club2): number => {
          return club1.name.localeCompare(club2.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_FEATURED_CLUB:
    {
      return Object.assign({}, state, {
        loadingFeatured: true,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_FEATURED_CLUB_FAIL:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_FEATURED_CLUB_SUCCESS:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: action.payload,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_CLUB_SUCCESS:
    {
      return Object.assign({}, state, {
        memberOfClub: action.payload,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_DETAIL_CLUB:
    {
      return Object.assign({}, state, {
        loadingDetail: true,
        club: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_DETAIL_CLUB_FAIL:
    {
      return Object.assign({}, state, {
        loadingDetail: false,
        club: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.LOAD_DETAIL_CLUB_SUCCESS:
    {
      return Object.assign({}, state, {
        loadingDetail: false,
        club: action.payload,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.SAVE_CLUB_SUCCESS:
    case clubActions.DELETE_CLUB_FAIL:
    {
      return Object.assign({}, state, {
        loading: true,
        clubs: [
          ...state.clubs.filter(c => c._id !== action.payload._id),
          action.payload,
        ].sort((club1, club2): number => {
          return club1.name.localeCompare(club2.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case clubActions.DELETE_CLUB_SUCCESS:
    case clubActions.SAVE_CLUB_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.clubs.filter(c => c._id !== c._id),
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
export const getDetailClub = (state: ClubsState) => state.club;
