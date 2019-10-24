import {
  ADD_COIN_TO_TRACKED,
  CoinsActionTypes,
  DELETE_COIN_FROM_TRACKED,
  GET_COINS_MAP,
  GET_NECESSARY_COINS, SORT_RACKED_BY,
  UPDATE_FILTER,
  UPDATE_TRACKED_COINS_DATA
} from "../types/actions";
import {ICoins} from "../types/ICoins";
import {localCash, sort} from "../utils";

const coinMapReducerDefaultState: ICoins = {
  coinsMap: [],
  filter: [],
  coinsListing: [],
  trackedCoins: localCash.getTrackedCoins()
};
const coinsReducer = (
  state = coinMapReducerDefaultState,
  action: CoinsActionTypes
): ICoins => {
  switch (action.type) {
    case GET_COINS_MAP:
      return {
        ...state,
        coinsMap: [...action.payload],
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: [...action.payload]
      };
    case GET_NECESSARY_COINS:
      return {
        ...state,
        coinsListing: [...action.payload]
      };
    case ADD_COIN_TO_TRACKED:
      const tracked = [...state.trackedCoins];
      tracked.unshift(action.payload);
      localCash.setTrackedCoins(tracked);
      return {
        ...state,
        trackedCoins: tracked
      };
    case UPDATE_TRACKED_COINS_DATA:
      localCash.setTrackedCoins(action.payload);
      return {
        ...state,
        trackedCoins: action.payload
      };
    case DELETE_COIN_FROM_TRACKED:
      const filteredCoins = state.trackedCoins.filter(item => item.id !== action.payload);
      localCash.setTrackedCoins(filteredCoins);
      return {
        ...state,
        trackedCoins: filteredCoins
      };
    case SORT_RACKED_BY:
      return {
        ...state,
        trackedCoins: sort(state.trackedCoins, action.payload)
      };
    default:
      return state;
  }
};

export {coinsReducer};