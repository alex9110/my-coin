import {ICoinMapItem} from "./ICoinMapItem";
import {ICoinListingItem} from "./ICoinListingItem";
import {SortBy} from "./SortBy";

export const GET_COINS_MAP = "GET_COINS_MAP";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const GET_NECESSARY_COINS = "GET_NECESSARY_COINS";
export const ADD_COIN_TO_TRACKED = "ADD_COIN_TO_TRACKED";
export const UPDATE_TRACKED_COINS_DATA = "UPDATE_TRACKED_COINS_DATA";
export const DELETE_COIN_FROM_TRACKED = "DELETE_COIN_FROM_TRACKED";
export const SORT_RACKED_BY = "SORT_RACKED_BY";

export interface IGetCoinsMap {
  type: typeof GET_COINS_MAP,
  payload: ICoinMapItem[]
}

export interface IUpdateFilter {
  type: typeof UPDATE_FILTER,
  payload: string[]
}

export interface IGetNecessaryCoins {
  type: typeof GET_NECESSARY_COINS,
  payload: ICoinListingItem[]
}

export interface IAddCoinToTracked {
  type: typeof ADD_COIN_TO_TRACKED,
  payload: ICoinListingItem
}

export interface IUpdateTrackedCoinsData {
  type: typeof UPDATE_TRACKED_COINS_DATA,
  payload: ICoinListingItem[]
}

export interface IDeleteCoinFromTracked {
  type: typeof DELETE_COIN_FROM_TRACKED,
  payload: number
}

export interface ISortTrackedBy {
  type: typeof SORT_RACKED_BY,
  payload: SortBy
}


export type CoinsActionTypes =
  | IGetCoinsMap
  | IUpdateFilter
  | IGetNecessaryCoins
  | IAddCoinToTracked
  | IUpdateTrackedCoinsData
  | IDeleteCoinFromTracked
  | ISortTrackedBy

export type AppActions = CoinsActionTypes;
