import { createSlice } from '@reduxjs/toolkit';

import { ordered as cakeOrdered } from '../cake/cakeSlice';

const initialState = {
	numberOfIcecreams: 20
};

const icecreamSlice = createSlice({
	name: 'icecream',
	initialState,
	reducers: {
		ordered: state => {
			state.numberOfIcecreams--;
		},
		restocked: (state, action) => {
			state.numberOfIcecreams += action.payload;
		}
	},
	/**
	 *
	 * extraReducers allows createSlice to respond to other action types besides the types it has generated.
	 * Latter method is preferred.
	 */
	// extraReducers: {
	// 	['cake/ordered']: state => {
	// 		state.numberOfIcecreams--;
	// 	}
	// }
	extraReducers: builder => {
		builder.addCase(cakeOrdered, state => {
			state.numberOfIcecreams--;
		});
	}
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
