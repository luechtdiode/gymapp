import {Action} from '@ngrx/store';
import {Sponsor} from '../model/backend-typings';
import * as sponsor from './sponsor.actions';

export interface SponsorsState {
  loaded: boolean;
  loading: boolean;
  sponsors: Sponsor[];
  loadingFeatured: boolean;
  featured: Sponsor;
};

const initialState: SponsorsState = {
  loaded: false,
  loading: false,
  sponsors: [],

  loadingFeatured: false,
  featured: undefined,
};

export function reducer(state = initialState, action: Action): SponsorsState {
  switch (action.type) {
    case sponsor.ActionTypes.LOAD_SPONSORS:
    {
      return Object.assign({}, state, {
        loading: true,
        loaded: state.loaded,
        sponsors: state.sponsors,
        loadingFeatured: state.loadingFeatured,
        featured: state.featured,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.ActionTypes.LOAD_SPONSORS_SUCCESS:
    {
      const cs: Sponsor[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        sponsors: [...cs].sort((sponsor1, sponsor2): number => {
          return sponsor2.name.localeCompare(sponsor1.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.ActionTypes.LOAD_FEATURED_SPONSOR:
    {
      return Object.assign({}, state, {
        loadingFeatured: true,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.ActionTypes.LOAD_FEATURED_SPONSOR_FAIL:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.ActionTypes.LOAD_FEATURED_SPONSOR_SUCCESS:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: action.payload,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.ActionTypes.SAVE_SPONSOR_SUCCESS:
    case sponsor.ActionTypes.DELETE_SPONSOR_FAIL:
    {
      return Object.assign({}, state, {
        loading: true,
        sponsors: [
          ...state.sponsors.filter(sponsor => sponsor._id !== action.payload._id),
          action.payload,
        ].sort((sponsor1, sponsor2): number => {
          return sponsor2.name.localeCompare(sponsor1.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.ActionTypes.DELETE_SPONSOR_SUCCESS:
    case sponsor.ActionTypes.SAVE_SPONSOR_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.sponsors.filter(sponsor => sponsor._id !== sponsor._id),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    default:
    {
      return state;
    }
  }
}

export const getSponsors = (state: SponsorsState) => state.sponsors;

export const getIds = (state: SponsorsState) => getSponsors(state).map(c => c._id);

export const isLoaded = (state: SponsorsState) => state.loaded;
export const isLoading = (state: SponsorsState) => state.loading;

export const getFeatured = (state: SponsorsState) => state.featured;
export const isLoadingFeatured = (state: SponsorsState) => state.loadingFeatured;
