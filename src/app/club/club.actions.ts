import { Action } from '@ngrx/store';
import { Club } from '../model/backend-typings';

export const   LOAD_CLUBS                 = '[CLUB] Load CLUBs';
export const   LOAD_CLUBS_SUCCESS         = '[CLUB] Load CLUBs Success';
export const   SAVE_CLUB                  = '[CLUB] Save CLUB';
export const   SAVE_CLUB_SUCCESS          = '[CLUB] Save CLUB Success';
export const   SAVE_CLUB_FAIL             = '[CLUB] Save CLUB Fail';
export const   DELETE_CLUB                = '[CLUB] Delete CLUB';
export const   DELETE_CLUB_SUCCESS        = '[CLUB] Delete CLUB Success';
export const   DELETE_CLUB_FAIL           = '[CLUB] Delete CLUB Fail';
export const   LOAD_CLUB                  = '[CLUB] Load MemberOf CLUB';
export const   LOAD_CLUB_SUCCESS          = '[CLUB] Load MemberOf CLUB Success';
export const   LOAD_FEATURED_CLUB         = '[CLUB] Load featured CLUB';
export const   LOAD_FEATURED_CLUB_SUCCESS = '[CLUB] Load featured CLUB success';
export const   LOAD_FEATURED_CLUB_FAIL    = '[CLUB] Load featured CLUB fail';
export const   LOAD_DETAIL_CLUB           = '[CLUB] Load DETAIL CLUB';
export const   LOAD_DETAIL_CLUB_SUCCESS   = '[CLUB] Load DETAIL CLUB success';
export const   LOAD_DETAIL_CLUB_FAIL      = '[CLUB] Load DETAIL CLUB fail';

export class LoadAllAction implements Action {
  readonly type = LOAD_CLUBS;
}
export class LoadAllSuccessAction implements Action {
  readonly type = LOAD_CLUBS_SUCCESS;
  constructor(public payload:  Club[]) { };
}
export class SaveAction implements Action {
  readonly type = SAVE_CLUB;
  constructor(public payload: Club) { };
}
export class SaveSuccessAction implements Action {
   readonly type = SAVE_CLUB_SUCCESS;
   constructor(public payload: Club) { };
}
export class SaveFailedAction implements Action {
  readonly type = SAVE_CLUB_FAIL;
  constructor(public payload: Club) { };
}
export class DeleteAction implements Action {
  readonly type = DELETE_CLUB;
  constructor(public payload: Club) { };
}
export class DeleteSuccessAction implements Action {
  readonly type = DELETE_CLUB_SUCCESS;
  constructor(public payload: Club) { };
}
export class DeleteFailedAction implements Action {
  readonly type = DELETE_CLUB_FAIL;
  constructor(public payload: Club) { };
}
export class LoadAction implements Action {
  readonly type = LOAD_CLUB;
  constructor(public payload: string) { };
}
export class LoadSuccessAction implements Action {
  readonly type = LOAD_CLUB_SUCCESS;
  constructor(public payload: Club) { };
}
export class LoadFeaturedAction implements Action {
  readonly type = LOAD_FEATURED_CLUB;
}
export class LoadFeaturedSuccessAction implements Action {
  readonly type = LOAD_FEATURED_CLUB_SUCCESS;
  constructor(public payload: Club) { };
}
export class LoadFeaturedFailedAction implements Action {
  readonly type = LOAD_FEATURED_CLUB_FAIL;
}

export class LoadDetailAction implements Action {
  readonly type = LOAD_DETAIL_CLUB;
  constructor(public payload: string) { };
}
export class LoadDetailSuccessAction implements Action {
  readonly type = LOAD_DETAIL_CLUB_SUCCESS;
  constructor(public payload: Club) { };
}
export class LoadDetailFailedAction implements Action {
  readonly type = LOAD_DETAIL_CLUB_FAIL;
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
