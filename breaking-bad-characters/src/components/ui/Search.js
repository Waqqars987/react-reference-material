import React, { useState, useRef } from 'react';

const Search = ({ onQueryChange }) => {
	const [ text, setText ] = useState('');
	const searchQueryRef = useRef();

	const queryChangeHandler = query => {
		setText(query);
		const timer = setTimeout(() => {
			if (query === searchQueryRef.current.value) {
				onQueryChange(query);
			} else {
				clearTimeout(timer);
			}
		}, 500);
	};

	return (
		<section className='search'>
			<form>
				<input
					type='text'
					className='form-control'
					placeholder='Search Characters'
					autoFocus
					value={text}
					onChange={event => queryChangeHandler(event.target.value)}
					ref={searchQueryRef}
				/>
			</form>
		</section>
	);
};

export default Search;
