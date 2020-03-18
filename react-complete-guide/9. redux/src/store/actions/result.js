import * as actionTypes from './actionsTypes';

export const saveResult = (result) => {
	// const updatedResult = result * 2;
	return {
		type   : actionTypes.STORE_RESULT,
		result : result
	};
};

export const storeResult = (result) => {
	//provided by thunk
	return (dispatch, getState) => {
		setTimeout(() => {
			const oldCounter = getState().ctr.counter;
			console.log(oldCounter);
			dispatch(saveResult(result));
		}, 2000);
	};
};

export const deleteResult = (resultElId) => {
	return {
		type       : actionTypes.DELETE_RESULT,
		resultElId : resultElId
	};
};
