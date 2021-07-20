import React, { useReducer, /*useState,*/ useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
	switch (action.type) {
		case 'SET':
			return action.ingredients;
		case 'ADD':
			return [ ...currentIngredients, action.ingredient ];
		case 'DELETE':
			return currentIngredients.filter(ing => ing.id !== action.id);
		default:
			throw new Error('Should not get there!');
	}
};

const Ingredients = () => {
	// React will re-render the component whenver our reducer returns the new state
	const [ userIngredients, dispatch ] = useReducer(ingredientReducer, []);
	const { isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear } = useHttp();

	// const [ userIngredients, setUserIngredients ] = useState([]);
	// const [ isLoading, setIsLoading ] = useState(false);
	// const [ error, setError ] = useState();

	/*
	useEffect():=>
	without 2nd argument: acts like 'componentDidUpdate()'. It runs the function AFTER EVERY component update(re-render)
	with [] as 2nd argument: acts like 'componentDidMount()'. It runs ONLY ONCE(after the first render)
	*/
	// This useEffect() is removed as we fetch it in the Search component
	// useEffect(() => {
	// 	fetch('https://react-hooks-update-211eb.firebaseio.com/ingredients.json')
	// 		.then((response) => response.json())
	// 		.then((responseData) => {
	// 			const loadedIngredients = [];
	// 			for (let key in responseData) {
	// 				loadedIngredients.push({
	// 					id     : key,
	// 					title  : responseData[key].title,
	// 					amount : responseData[key].amount
	// 				});
	// 			}
	// 			setUserIngredients(loadedIngredients);
	// 		});
	// }, []);

	// Will only run when the dependency changes,i.e. 'userIngredients'
	useEffect(
		() => {
			if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
				dispatch({ type: 'DELETE', id: reqExtra });
			} else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
				dispatch({ type: 'ADD', ingredient: { id: data.name, ...reqExtra } });
			}
		},
		[ data, reqExtra, reqIdentifier, isLoading, error ]
	);

	/* 
	useCallBack: using this React caches the function 'filteredIngredientsHandler' and its not recreated when the component
	is re-rendered. Hence the props to the Search compoenent won't change and it won' cause infinite loop in there.
	*/
	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		// setUserIngredients(filteredIngredients);
		dispatch({ type: 'SET', ingredients: filteredIngredients });
	}, []);

	const addIngredientHandler = useCallback(
		ingredient => {
			sendRequest(
				'https://react-hooks-update-211eb.firebaseio.com/ingredients.json',
				'POST',
				JSON.stringify(ingredient),
				ingredient,
				'ADD_INGREDIENT'
			);
			// setIsLoading(true);
			// dispatchHttp({ type: 'SEND' });
			// fetch('https://react-hooks-update-211eb.firebaseio.com/ingredients.json', {
			// 	method  : 'POST',
			// 	body    : JSON.stringify(ingredient),
			// 	headers : { 'Content-Type': 'application/json' }
			// })
			// 	.then(response => {
			// 		// setIsLoading(false);
			// 		dispatchHttp({ type: 'RESPONSE' });
			// 		return response.json();
			// 	})
			// 	.then(responseData => {
			// 		// setUserIngredients((prevIngredients) => [
			// 		// 	...prevIngredients,
			// 		// 	{ id: responseData.name, ...ingredient }
			// 		// ]);
			// 		dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } });
			// 	});
		},
		[ sendRequest ]
	);

	const removeIngredientHandler = useCallback(
		ingredientId => {
			// setIsLoading(true);
			// dispatchHttp({ type: 'SEND' });
			sendRequest(
				`https://react-hooks-update-211eb.firebaseio.com/ingredients/${ingredientId}.json`,
				'DELETE',
				null,
				ingredientId,
				'REMOVE_INGREDIENT'
			);
		},
		[ sendRequest ]
	);

	// const clearError = useCallback(() => {
	// setError(null);
	// dispatchHttp({ type: 'CLEAR' });
	// }, []);

	//	Alternative to React.memo()
	const ingredientList = useMemo(
		() => {
			return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />;
		},
		[ userIngredients, removeIngredientHandler ]
	);

	return (
		<div className='App'>
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

			<IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				{ingredientList}
			</section>
		</div>
	);
};

export default Ingredients;
