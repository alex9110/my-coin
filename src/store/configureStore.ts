import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {AppActions} from "../types/actions";
import {composeWithDevTools} from "redux-devtools-extension";
import {coinsReducer} from "../reducers/coins";

export const rootReducer = combineReducers({
  coins: coinsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
);
