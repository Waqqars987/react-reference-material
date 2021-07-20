import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
	results : []
};

const deleteResult = (state, action) => {
	// First to immutably change array
	// const id = 2;
	// const newArray = [ ...state.results ];
	// newArray.results.splice(id, 1);

	// Second way...
	const updatedArray = state.results.filter((result) => result.id !== action.resultElId);
	return updateObject(state, { results: updatedArray });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.STORE_RESULT:
			//Don't use 'push()' as it mutates the original array, concat() returns a new array
			return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.result * 2 }) });
		case actionTypes.DELETE_RESULT:
			return deleteResult(state, action);
		default:
			return state;
	}
};
export default reducer;
