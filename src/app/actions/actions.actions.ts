import { type } from '../shared/util';
import { Action as Action } from '@ngrx/store';
import { Action as SponsorAction } from '../model/backend-typings';

export const LOAD_SPONSORACTIONS         = '[ACTIONS] Load LOAD_SPONSORACTIONS';
export const LOAD_SPONSORACTIONS_SUCCESS = '[ACTIONS] Load LOAD_SPONSORACTIONS Success';

export class LoadAllAction implements Action {
  type = LOAD_SPONSORACTIONS;
  payload: any = undefined;
}

export class LoadAllSuccessAction implements Action {
  type = LOAD_SPONSORACTIONS_SUCCESS;
  constructor(public payload: SponsorAction[]) { }
}

export type Actions = LoadAllSuccessAction | LoadAllAction;
