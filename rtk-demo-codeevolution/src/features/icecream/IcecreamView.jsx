import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ordered, restocked } from './icecreamSlice';

export const IcecreamView = () => {
	const [value, setValue] = useState(1);
	const numberOfIcecreams = useSelector(state => state.icecream.numberOfIcecreams);
	const dispatch = useDispatch();

	return (
		<div>
			<h2>Number of icecreams - {numberOfIcecreams} </h2>
			<button onClick={() => dispatch(ordered())}>Order icecream</button>
			<input type='number' value={value} onChange={e => setValue(parseInt(e.target.value))} />
			<button onClick={() => dispatch(restocked(value))}>Restock icecreams</button>
		</div>
	);
};
