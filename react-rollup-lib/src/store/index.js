import React from 'react';
import { createStore, combineReducers } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';

import counter from './reducers/counter';

const rootReducer = combineReducers({ counter });

const store = createStore(rootReducer);
window.store = store;

export const useStore = () => {
	const state = useSelector(state => state);
	const dispatch = useDispatch();

	return [state, dispatch];
};

export const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

export { increment, decrement } from './actions/counter';
