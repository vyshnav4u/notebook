import { createModel } from '@rematch/core';
import { IRootModel } from '.';

export interface IAnnotation {
	show: boolean;
	annotationData: Record<string, string>;
	fontColor: string;
}

const initialState: IAnnotation = {
	annotationData: {},
	show: false,
	fontColor: '#000',
};

export const annotation = createModel<IRootModel>()({
	state: initialState,
	reducers: {
		update(state: IAnnotation, payload: Partial<IAnnotation>) {
			return { ...state, ...payload };
		},
	},
});
