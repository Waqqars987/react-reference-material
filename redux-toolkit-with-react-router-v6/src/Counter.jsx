import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment, reset } from './store/slices/counter';

function Counter() {
	const value = useSelector(({ counter }) => counter.value);
	const dispatch = useDispatch();

	useEffect(() => () => dispatch(reset()), [dispatch]);

	return (
		<div>
			<h1>Counter</h1>
			<p>Value: {value}</p>
			<button
				style={{ display: 'block', marginBlock: '1em' }}
				onClick={() => dispatch(increment())}
			>
				Increase
			</button>
			<button
				style={{ display: 'block', marginBlock: '1em' }}
				onClick={() => dispatch(decrement())}
			>
				Decrease
			</button>
		</div>
	);
}

export default Counter;
