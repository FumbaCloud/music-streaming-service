import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import { Context, createWrapper } from "next-redux-wrapper";
import thunk, { ThunkDispatch } from "redux-thunk";

import { reducer, RootState } from "./reducers";

const makeStore = (context: Context) => {
  return createStore(reducer, applyMiddleware(thunk));
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
