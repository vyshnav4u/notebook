import { IDispatch, IRootState } from "../store";

export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state: number, payload: number) {
      return state + payload;
    },
  },
  effects: (dispatch: IDispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload: number, state: IRootState) {
      console.log("This is current root state", state);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
};