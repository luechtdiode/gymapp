import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import {Competition} from '../model/backend-typings';

export const LOAD_COMPETITIONS =                 '[COMPETITION] Load COMPETITIONs';
export const LOAD_COMPETITIONS_SUCCESS =         '[COMPETITION] Load COMPETITIONs Success';
export const CREATE_COMPETITION =                '[COMPETITION] Create COMPETITION';
export const CREATE_COMPETITION_SUCCESS =        '[COMPETITION] Create COMPETITION Success';
export const CREATE_COMPETITION_FAIL =           '[COMPETITION] Create COMPETITION Fail';
export const SAVE_COMPETITION =                  '[COMPETITION] Save COMPETITION';
export const SAVE_COMPETITION_SUCCESS =          '[COMPETITION] Save COMPETITION Success';
export const SAVE_COMPETITION_FAIL =             '[COMPETITION] Save COMPETITION Fail';
export const DELETE_COMPETITION =                '[COMPETITION] Delete COMPETITION';
export const DELETE_COMPETITION_SUCCESS =        '[COMPETITION] Delete COMPETITION Success';
export const DELETE_COMPETITION_FAIL =           '[COMPETITION] Delete COMPETITION Fail';
export const LOAD_COMPETITION =                  '[COMPETITION] Load COMPETITION';
export const LOAD_COMPETITION_SUCCESS =          '[COMPETITION] Load COMPETITION success';
export const LOAD_COMPETITION_FAIL =             '[COMPETITION] Load COMPETITION fail';
export const LOAD_FEATURED_COMPETITION =         '[COMPETITION] Load featured COMPETITION';
export const LOAD_FEATURED_COMPETITION_SUCCESS = '[COMPETITION] Load featured COMPETITION success';
export const LOAD_FEATURED_COMPETITION_FAIL =    '[COMPETITION] Load featured COMPETITION fail';

export class LoadAllAction implements Action {
  type = LOAD_COMPETITIONS;
  payload: any = undefined;
}
export class LoadAllSuccessAction implements Action {
  type = LOAD_COMPETITIONS_SUCCESS;
  constructor(public payload: Competition[]) {}
}
export class CreateAction implements Action {
  type = CREATE_COMPETITION;
  constructor(public payload: Competition) {}
}
export class CreateSuccessAction implements Action {
  type = CREATE_COMPETITION_SUCCESS;
  constructor(public payload: Competition) {}
}
export class CreateFailedAction implements Action {
  type = CREATE_COMPETITION_FAIL;
  constructor(public payload: Competition) {}
}
export class SaveAction implements Action {
  type = SAVE_COMPETITION;
  constructor(public payload: Competition) {}
}
export class SaveSuccessAction implements Action {
  type = SAVE_COMPETITION_SUCCESS;
  constructor(public payload: Competition) {}
}
export class SaveFailedAction implements Action {
  type = SAVE_COMPETITION_FAIL;
  constructor(public payload: Competition) {}
}
export class DeleteAction implements Action {
  type = DELETE_COMPETITION;
  constructor(public payload: Competition) {}
}
export class DeleteSuccessAction implements Action {
  type = DELETE_COMPETITION_SUCCESS;
  constructor(public payload: Competition) {}
}
export class DeleteFailedAction implements Action {
  type = DELETE_COMPETITION_FAIL;
  constructor(public payload: Competition) {}
}
export class LoadAction implements Action {
  type = LOAD_COMPETITION;
  constructor(public payload: string) {}
}
export class LoadDetailSuccessAction implements Action {
  type = LOAD_COMPETITION_SUCCESS;
  constructor(public payload: Competition) {}
}
export class LoadDetailFailedAction implements Action {
  type = LOAD_COMPETITION_FAIL;
  payload: any = undefined;
}
export class LoadFeaturedAction implements Action {
  type = LOAD_FEATURED_COMPETITION;
  payload: any = undefined;
}
export class LoadFeaturedSuccessAction implements Action {
  type = LOAD_FEATURED_COMPETITION_SUCCESS;
  constructor(public payload: Competition) {}
}
export class LoadFeaturedFailedAction implements Action {
  type = LOAD_FEATURED_COMPETITION_FAIL;
  payload: any = undefined;
}

export type Actions =
    LoadAllAction
  | LoadAllSuccessAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailedAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailedAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailedAction
  | LoadAction
  | LoadDetailSuccessAction
  | LoadDetailFailedAction
  | LoadFeaturedAction
  | LoadFeaturedSuccessAction
  | LoadFeaturedFailedAction;
