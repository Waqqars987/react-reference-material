import { useReducer, useCallback } from 'react';

const initialState = {
	loading    : false,
	error      : null,
	data       : null,
	extra      : null,
	identifier : null
};

const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
		case 'RESPONSE':
			return { ...curHttpState, loading: false, data: action.responseData, extra: action.extra };
		case 'ERROR':
			return { loading: false, error: action.errorMessage };
		case 'CLEAR':
			return initialState;
		default:
			throw new Error('Should not be reached!');
	}
};

const useHttp = () => {
	const [ httpState, dispatchHttp ] = useReducer(httpReducer, initialState);

	const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

	const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
		dispatchHttp({ type: 'SEND', identifier: reqIdentifier });
		fetch(url, {
			method  : method,
			body    : body,
			headers : {
				'Content-Type' : 'application/json'
			}
		})
			.then(response => response.json())
			.then(responseData => {
				// setIsLoading(false);
				dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra });
				// setUserIngredients((prevIngredients) =>
				// 	prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
				// );
				// dispatch({ type: 'DELETE', id: ingredientId });
			})
			.catch(error => {
				// All state updates from synchronous event handler are batched together
				// Both these state updates will cause only one re-render cycle to reflect the state changes
				// setError('Something Went Wrong!');
				// setIsLoading(false);
				dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
			});
	}, []);
	return {
		isLoading     : httpState.loading,
		data          : httpState.data,
		error         : httpState.error,
		sendRequest   : sendRequest,
		reqExtra      : httpState.extra,
		reqIdentifier : httpState.identifier,
		clear         : clear
	};
};

export default useHttp;
