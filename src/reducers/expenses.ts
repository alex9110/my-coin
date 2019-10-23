import {Expense} from "../types/Expense";
import {ExpenseActionTypes} from "../types/actions";

const expensesReducerDefaultState: Expense[] = [
  {
    id: "a",
    description: "string",
    note: "string",
    amount: 2,
    createdAt: 2,
  },
  {
    id: "d",
    description: "string",
    note: "string",
    amount: 2,
    createdAt: 2,
  }
];

const expenseReducer = (
  state = expensesReducerDefaultState,
  action: ExpenseActionTypes
): Expense[] => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({id}) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.expense.id) {
          return {
            ...expense,
            ...action.expense
          };
        } else {
          return expense;
        }
      });
    case "SET_EXPENSES":
      return action.expenses;
    default:
      return state;
  }
};

export {expenseReducer};
