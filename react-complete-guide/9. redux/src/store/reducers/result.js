import * as actionTypes from '../actions';

const initialState = {
	results : []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.STORE_RESULT:
			return {
				...state,
				//Don't use 'push()' as it mutates the original array, concat() returns a new array
				results : state.results.concat({ id: new Date(), value: action.result })
			};
		case actionTypes.DELETE_RESULT:
			// First to immutably change array
			// const id = 2;
			// const newArray = [ ...state.results ];
			// newArray.results.splice(id, 1);

			// Second way...
			const updatedArray = state.results.filter((result) => result.id !== action.resultElId);
			return {
				...state,
				results : updatedArray
			};
		default:
			return state;
	}
};
export default reducer;
