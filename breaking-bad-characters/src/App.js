import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/ui/Header';
import CharacterGrid from './components/characters/CharacterGrid';
import Search from './components/ui/Search';

const App = () => {
	const [ items, setItems ] = useState([]);
	const [ isLoading, setIsLoading ] = useState();
	const [ query, setQuery ] = useState('');

	useEffect(
		() => {
			setIsLoading(true);
			const fetchItems = async () => {
				const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`);
				setItems(result.data);
				setIsLoading(false);
			};
			fetchItems();
		},
		[ query ]
	);

	return (
		<div className='container'>
			<Header />
			<Search
				onQueryChange={query => {
					setQuery(query);
				}}
			/>
			<CharacterGrid isLoading={isLoading} items={items} />
		</div>
	);
};

export default App;
