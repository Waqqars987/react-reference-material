const { createSlice } = require('@reduxjs/toolkit');
const { cakeActions } = require('../cake/cakeSlice');

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
		builder.addCase(cakeActions.ordered, state => {
			state.numberOfIcecreams--;
		});
	}
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
