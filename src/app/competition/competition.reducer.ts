import {Action} from '@ngrx/store';
import {Competition} from '../model/backend-typings';
import * as competition from './competition.actions';

export interface CompetitionsState {
  loaded: boolean;
  loading: boolean;
  competitions: Competition[];
  loadingFeatured: boolean;
  featured: Competition;
  loadingDetail: boolean;
  detail: Competition;
};

const initialState: CompetitionsState = {
  loaded: false,
  loading: false,
  competitions: [],

  loadingFeatured: false,
  featured: undefined,

  loadingDetail: false,
  detail: undefined,
};

const dateCompare = (comp1, comp2): number => {
  const d1 = typeof comp1.dates[0] === 'string' ? Date.parse(typeof comp1.dates[0]) : comp1.dates[0].getDate();
  const d2 = typeof comp2.dates[0] === 'string' ? Date.parse(typeof comp2.dates[0]) : comp2.dates[0].getDate();
  return d2 - d1;
};

export function reducer(state = initialState, action: competition.Actions): CompetitionsState {
  switch (action.type) {
    case competition.LOAD_COMPETITIONS:
    {
      return Object.assign({}, state, {
        loading: true,
        loaded: state.loaded,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.LOAD_COMPETITIONS_SUCCESS:
    {
      const cs: Competition[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        competitions: [...cs].sort(dateCompare),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.LOAD_FEATURED_COMPETITION:
    {
      return Object.assign({}, state, {
        loadingFeatured: true,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.LOAD_FEATURED_COMPETITION_FAIL:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.LOAD_FEATURED_COMPETITION_SUCCESS:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: action.payload,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.LOAD_COMPETITION:
    {
      return Object.assign({}, state, {
        loadingDetail: true,
        detail: undefined,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.LOAD_COMPETITION_FAIL:
    {
      return Object.assign({}, state, {
        loadingDetail: false,
        detail: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.LOAD_COMPETITION_SUCCESS:
    {
      return Object.assign({}, state, {
        loadingDetail: false,
        detail: action.payload,
        competitions: [
          ...state.competitions.filter(comp => comp._id !== action.payload._id),
          action.payload,
        ].sort(dateCompare),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.SAVE_COMPETITION_SUCCESS:
    case competition.CREATE_COMPETITION_SUCCESS:
    case competition.DELETE_COMPETITION_FAIL:
    {
      return Object.assign({}, state, {
        loading: false,
        competitions: [
          ...state.competitions.filter(comp => comp._id !== action.payload._id),
          action.payload,
        ].sort(dateCompare),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case competition.DELETE_COMPETITION_SUCCESS:
    case competition.CREATE_COMPETITION_FAIL:
    case competition.SAVE_COMPETITION_FAIL:
    {
      return Object.assign({}, state, {
        competitions: [
          ...state.competitions.filter(comp => comp._id !== action.payload._id),
        ].sort(dateCompare),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    default:
    {
      return state;
    }
  }
}

export const getCompetitions = (state: CompetitionsState) => state.competitions;

export const getIds = (state: CompetitionsState) => getCompetitions(state).map(c => c._id);

export const isLoaded = (state: CompetitionsState) => state.loaded;
export const isLoading = (state: CompetitionsState) => state.loading;
export const isLoadingOrLoaded = (state: CompetitionsState) => state.loading || state.loaded;

export const getFeatured = (state: CompetitionsState) => state.featured;
export const isLoadingFeatured = (state: CompetitionsState) => state.loadingFeatured;

export const getCompetition = (state: CompetitionsState) => state.detail;
export const isLoadingDetail = (state: CompetitionsState) => state.loadingDetail;
