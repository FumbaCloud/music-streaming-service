import { AnyAction, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import { playerReducer } from "./playerReducer";
import { trackReducer } from "./trackReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const reducer = (
  state: ReturnType<typeof rootReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return rootReducer(state, action);
  }
};
