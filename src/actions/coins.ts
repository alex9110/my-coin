import {ICoinMapItem} from "../types/ICoinMapItem";
import {
  ADD_COIN_TO_TRACKED,
  AppActions,
  DELETE_COIN_FROM_TRACKED,
  GET_COINS_MAP,
  GET_NECESSARY_COINS,
  UPDATE_FILTER,
  UPDATE_TRACKED_COINS_DATA
} from "../types/actions";
import {Dispatch} from "redux";
import {AppState} from "../store/configureStore";
import {ICoinListingItem} from "../types/ICoinListingItem";
import {fetchCoinsListing, fetchCoinsMap} from "../services/api";
import {Filter} from "../types/Filter";


export const getCoinsMap = (coinsMap: ICoinMapItem[]): AppActions => ({
  type: GET_COINS_MAP,
  payload: coinsMap
});

export const startGetCoinsMap = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const result = await fetchCoinsMap();
    dispatch(getCoinsMap(result.coinsMap));
  };
};


export const updateFilter = (filter: string[]): AppActions => ({
  type: UPDATE_FILTER,
  payload: filter
});


export const getCoinsListing = (coinsListing: ICoinListingItem[]): AppActions => ({
  type: GET_NECESSARY_COINS,
  payload: coinsListing
});

export const startGetCoinsListing = (filter: Filter) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const result = await fetchCoinsListing(filter);
    console.log(result);
    dispatch(getCoinsListing(result.coinsListing));
  };
};

export const addCoinToTracked = (coin: ICoinListingItem): AppActions => ({
  type: ADD_COIN_TO_TRACKED,
  payload: coin
});

export const updateTrackedCoins = (updateTargetCoins: ICoinListingItem[]): AppActions => ({
  type: UPDATE_TRACKED_COINS_DATA,
  payload: updateTargetCoins
});
export const startUpdateTrackedCoins = (coinsListing: ICoinListingItem[]) => {
  const filter: Filter = [];
  coinsListing.forEach(item => filter.push(item.slug));
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const result = await fetchCoinsListing(filter);
    dispatch(updateTrackedCoins(result.coinsListing));
  };
};

export const deleteTrackedCoins = (id: number): AppActions => ({
  type: DELETE_COIN_FROM_TRACKED,
  payload: id
});