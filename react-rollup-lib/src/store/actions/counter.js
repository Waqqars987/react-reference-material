import { INCREASE, DECREASE } from './actionTypes';

export const increment = () => ({
	type: INCREASE,
});

export const decrement = () => ({
	type: DECREASE,
});
