import {Expense} from "../types/Expense";
import {
  AppActions,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES,
} from "../types/actions";
import {Dispatch} from "redux";
import {AppState} from "../store/configureStore";


export const removeExpense = (id: string): AppActions => ({
  type: REMOVE_EXPENSE,
  id
});

export const editExpense = (expense: Expense): AppActions => ({
  type: EDIT_EXPENSE,
  expense
});

export const setExpenses = (expenses: Expense[]): AppActions => ({
  type: SET_EXPENSES,
  expenses
});
export const startRemoveExpense = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(removeExpense(id));
    setTimeout(() => {
      dispatch(removeExpense(id));
    }, 2000);
  };
};

export const startSetExpenses = (expenses: Expense[]) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(setExpenses(expenses));
  };
};


