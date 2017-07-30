import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import { Sponsor } from '../model/backend-typings';

export const LOAD_SPONSORS =                 '[SPONSOR] Load SPONSORs';
export const LOAD_SPONSORS_SUCCESS =         '[SPONSOR] Load SPONSORs Success';
export const SAVE_SPONSOR =                  '[SPONSOR] Save SPONSOR';
export const SAVE_SPONSOR_SUCCESS =          '[SPONSOR] Save SPONSOR Success';
export const SAVE_SPONSOR_FAIL =             '[SPONSOR] Save SPONSOR Fail';
export const DELETE_SPONSOR =                '[SPONSOR] Delete SPONSOR';
export const DELETE_SPONSOR_SUCCESS =        '[SPONSOR] Delete SPONSOR Success';
export const DELETE_SPONSOR_FAIL =           '[SPONSOR] Delete SPONSOR Fail';
export const LOAD_SPONSOR =                  '[SPONSOR] Load SPONSOR';
export const LOAD_SPONSOR_SUCCESS =          '[SPONSOR] Load SPONSOR Success';
export const LOAD_FEATURED_SPONSOR =         '[SPONSOR] Load featured SPONSOR';
export const LOAD_FEATURED_SPONSOR_SUCCESS = '[SPONSOR] Load featured SPONSOR success';
export const LOAD_FEATURED_SPONSOR_FAIL =    '[SPONSOR] Load featured SPONSOR fail';
export const LOAD_DETAIL_SPONSOR =           '[SPONSOR] Load DETAIL SPONSOR';
export const LOAD_DETAIL_SPONSOR_SUCCESS =   '[SPONSOR] Load DETAIL SPONSOR success';
export const LOAD_DETAIL_SPONSOR_FAIL =      '[SPONSOR] Load DETAIL SPONSOR fail';


export class LoadAllAction implements Action {
  type = LOAD_SPONSORS;
  payload: any;
}
export class LoadAllSuccessAction implements Action {
  type = LOAD_SPONSORS_SUCCESS;
  constructor(public payload: Sponsor[]) {}
}
export class SaveAction implements Action {
  type = SAVE_SPONSOR;
  constructor(public  payload: Sponsor) {}
}
export class SaveSuccessAction implements Action {
  type = SAVE_SPONSOR_SUCCESS;
  constructor(public payload: Sponsor) {}
}
export class SaveFailedAction implements Action {
  type = SAVE_SPONSOR_FAIL;
  constructor(public payload: Sponsor) {}
}
export class DeleteAction implements Action {
  type = DELETE_SPONSOR;
  constructor(public payload: Sponsor) {}
}
export class DeleteSuccessAction implements Action {
  type = DELETE_SPONSOR_SUCCESS;
  constructor(public payload: Sponsor) {}
}
export class DeleteFailedAction implements Action {
  type = DELETE_SPONSOR_FAIL;
  constructor(public payload: Sponsor) {}
}
export class LoadAction implements Action {
  type = LOAD_SPONSOR;
  constructor(public payload: string) {}
}
export class LoadSuccessAction implements Action {
  type = LOAD_SPONSOR_SUCCESS;
  constructor(public payload: Sponsor) {}
}
export class LoadFeaturedAction implements Action {
  type = LOAD_FEATURED_SPONSOR;
  payload: any;
}
export class LoadFeaturedSuccessAction implements Action {
  type = LOAD_FEATURED_SPONSOR_SUCCESS;
  constructor(public payload: Sponsor) { }
}
export class LoadFeaturedFailedAction implements Action {
  type = LOAD_DETAIL_SPONSOR_FAIL;
  payload: any;
}
export class LoadDetailAction implements Action {
  type = LOAD_DETAIL_SPONSOR;
  constructor(public payload: string) { }
}
export class LoadDetailSuccessAction implements Action {
  type = LOAD_DETAIL_SPONSOR_SUCCESS;
  constructor(public payload: Sponsor) { }
}
export class LoadDetailFailedAction implements Action {
  type = LOAD_DETAIL_SPONSOR_FAIL;
  payload: any;
}

export type Actions =
    LoadAllAction
  | LoadAllSuccessAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailedAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailedAction
  | LoadAction
  | LoadSuccessAction
  | LoadFeaturedAction
  | LoadFeaturedSuccessAction
  | LoadFeaturedFailedAction
  | LoadDetailAction
  | LoadDetailSuccessAction
  | LoadDetailFailedAction;
