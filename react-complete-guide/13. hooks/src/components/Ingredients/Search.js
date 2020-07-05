import React, { useState, useEffect /* useRef*/ } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(props => {
	const { onLoadIngredients } = props;
	const [ enteredFilter, setEnteredFilter ] = useState('');
	// const inputRef = useRef();
	const { isLoading, data, error, sendRequest, clear } = useHttp();

	useEffect(
		() => {
			const timer = setTimeout(() => {
				// After using useEffect’s cleanup callback, it is possible to remove the mentioned check and the related inputRef
				// stuff completely from the Search component.
				// if (enteredFilter === inputRef.current.value) {
				const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
				sendRequest('https://react-hooks-update-211eb.firebaseio.com/ingredients.json' + query, 'GET');
			}, /*}*/ 500);
			/* Cleanup function: runs before the next execution of useEffect().
			If we have [] dependencies(i.e the effect only runs once), the cleanup function runs when the component gets unmounted */
			return () => {
				clearTimeout(timer);
			};
		},
		[ enteredFilter, sendRequest /*inputRef*/ ]
	);

	useEffect(
		() => {
			if (!isLoading && !error && data) {
				const loadedIngredients = [];
				for (const key in data) {
					loadedIngredients.push({
						id     : key,
						title  : data[key].title,
						amount : data[key].amount
					});
				}
				onLoadIngredients(loadedIngredients);
			}
		},
		[ data, isLoading, error, onLoadIngredients ]
	);

	return (
		<section className='search'>
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
			<Card>
				<div className='search-input'>
					<label>Filter by Title</label>
					{isLoading && <span>Loading...</span>}
					<input
						type='text'
						// ref={inputRef}
						value={enteredFilter}
						onChange={event => setEnteredFilter(event.target.value)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
