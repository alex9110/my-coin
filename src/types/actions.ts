import {Expense} from "./Expense";
import {ICoinMapItem} from "./ICoinMapItem";
import {ICoinListingItem} from "./ICoinListingItem";

// action strings
export const ADD_EXPENSE = "ADD_EXPENSE";
export const EDIT_EXPENSE = "EDIT_EXPENSE";
export const REMOVE_EXPENSE = "REMOVE_EXPENSE";
export const SET_EXPENSES = "SET_EXPENSES";

export interface SetExpenseAction {
  type: typeof SET_EXPENSES;
  expenses: Expense[];
}

export interface EditExpenseAction {
  type: typeof EDIT_EXPENSE;
  expense: Expense;
}

export interface RemoveExpenseAction {
  type: typeof REMOVE_EXPENSE;
  id: string;
}

export interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  expense: Expense;
}

export type ExpenseActionTypes =
  | SetExpenseAction
  | EditExpenseAction
  | RemoveExpenseAction
  | AddExpenseAction;


export const GET_COINS_MAP = "GET_COINS_MAP";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const GET_NECESSARY_COINS = "GET_NECESSARY_COINS";
export const ADD_COIN_TO_TRACKED = "ADD_COIN_TO_TRACKED";
export const UPDATE_TRACKED_COINS_DATA = "UPDATE_TRACKED_COINS_DATA";
export const DELETE_COIN_FROM_TRACKED = "DELETE_COIN_FROM_TRACKED";

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

export type CoinsActionTypes =
  | IGetCoinsMap
  | IUpdateFilter
  | IGetNecessaryCoins
  | IAddCoinToTracked
  | IUpdateTrackedCoinsData
  | IDeleteCoinFromTracked

export type AppActions = ExpenseActionTypes | CoinsActionTypes;
