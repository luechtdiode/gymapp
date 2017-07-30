import {Action} from '@ngrx/store';
import {Sponsor} from '../model/backend-typings';
import * as sponsor from './sponsor.actions';
import { isMemberOfSponsor } from '../app-state.reducer';

export interface SponsorsState {
  loaded: boolean;
  loading: boolean;
  sponsors: Sponsor[];
  isMemberOfSponsor?: Sponsor;
  loadingFeatured: boolean;
  featured: Sponsor;
  detail: Sponsor;
  loadingDetail: boolean;
};

const initialState: SponsorsState = {
  loaded: false,
  loading: false,
  sponsors: [],
  isMemberOfSponsor: undefined,
  loadingFeatured: false,
  featured: undefined,
  detail: undefined,
  loadingDetail: false,
};

export function reducer(state = initialState, action: sponsor.Actions): SponsorsState {
  switch (action.type) {
    case sponsor.LOAD_SPONSORS:
    {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_SPONSORS_SUCCESS:
    {
      const cs: Sponsor[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        sponsors: [...cs].sort((sponsor1, sponsor2): number => {
          return sponsor1.name.localeCompare(sponsor2.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_FEATURED_SPONSOR:
    {
      return Object.assign({}, state, {
        loadingFeatured: true,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_FEATURED_SPONSOR_FAIL:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_FEATURED_SPONSOR_SUCCESS:
    {
      return Object.assign({}, state, {
        loadingFeatured: false,
        featured: action.payload,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_SPONSOR_SUCCESS:
    {
      return Object.assign({}, state, {
        isMemberOfSponsor: action.payload,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_DETAIL_SPONSOR:
    {
      return Object.assign({}, state, {
        isLoadingDetail: true,
        detail: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_DETAIL_SPONSOR_FAIL:
    {
      return Object.assign({}, state, {
        isLoadingDetail: false,
        detail: undefined,
      });
    }
    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.LOAD_DETAIL_SPONSOR_SUCCESS:
    {
      return Object.assign({}, state, {
        isLoadingDetail: false,
        detail: action.payload,
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.SAVE_SPONSOR_SUCCESS:
    case sponsor.DELETE_SPONSOR_FAIL:
    {
      return Object.assign({}, state, {
        loading: true,
        sponsors: [
          ...state.sponsors.filter(s => s._id !== action.payload._id),
          action.payload,
        ].sort((sponsor1, sponsor2): number => {
          return sponsor1.name.localeCompare(sponsor2.name);
        }),
      });
    }

    // tslint:disable-next-line:no-switch-case-fall-through
    case sponsor.DELETE_SPONSOR_SUCCESS:
    case sponsor.SAVE_SPONSOR_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.sponsors.filter(s => s._id !== s._id),
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
export const getMemberOfSponsor = (state: SponsorsState) => state.isMemberOfSponsor;

export const getIds = (state: SponsorsState) => getSponsors(state).map(c => c._id);

export const isLoaded = (state: SponsorsState) => state.loaded;
export const isLoading = (state: SponsorsState) => state.loading;

export const getFeatured = (state: SponsorsState) => state.featured;
export const isLoadingFeatured = (state: SponsorsState) => state.loadingFeatured;

export const getDetail = (state: SponsorsState) => state.detail;
export const isLoadingDetail = (state: SponsorsState) => state.loadingDetail;
