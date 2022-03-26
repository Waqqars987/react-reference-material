import { INCREASE, DECREASE } from 'store/actions/actionTypes';

const INITIAL_STATE = {
	count: 0,
};

const counterReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case INCREASE:
			return { count: state.count + 1 };
		case DECREASE:
			return { count: state.count - 1 };
		default:
			return state;
	}
};

export default counterReducer;
