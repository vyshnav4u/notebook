import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, IRootModel } from './models';

export const store = init({
	models,
});

export type IStore = typeof store;
export type IDispatch = RematchDispatch<IRootModel>;
export type IRootState = RematchRootState<IRootModel>;
