import { IDispatch, IRootState } from "../store";

export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state: number, payload: number) {
      console.log('stet rein');
      
      return state + payload;
    },
  },
  effects: (dispatch: IDispatch) => ({
    increment(payload: number, rootState: IRootState) {
      console.log('eff', payload);
      
      dispatch.annotation.update({show: !!(payload % 2)})
    },
  }),
};