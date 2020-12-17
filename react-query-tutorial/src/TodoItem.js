import React from 'react';
import { useMutation, useQueryCache } from 'react-query';
import { deleteTodo, updateTodo } from './api';

export const TodoItem = ({ id, title, notes, completed }) => {
	const queryCache = useQueryCache();

	const [mutateDelete] = useMutation(deleteTodo, {
		onSuccess: () => queryCache.invalidateQueries('todos'),
	});

	const [mutateCheck] = useMutation(updateTodo, {
		onMutate: newTodo => {
			queryCache.cancelQueries('todos');
			const previousQuery = queryCache.getQueryData('todos');
			queryCache.setQueryData('todos', oldQuery => {
				return oldQuery.map(group => {
					return {
						...group,
						records: group.records.map(record => {
							if (record.id === newTodo.id) {
								return {
									...record,
									fields: { ...record.fields, ...newTodo.fields },
								};
							} else {
								return record;
							}
						}),
					};
				});
			});
			return () => queryCache.setQueryData('todos', previousQuery);
		},
		onError: (_, __, rollback) => rollback(),
		onSettled: () => {
			queryCache.invalidateQueries('todos');
		},
	});

	const remove = () => {
		mutateDelete(id);
	};

	const onCheck = event => {
		mutateCheck({ id, fields: { completed: event.target.checked } });
	};

	return (
		<li>
			<section style={{ border: '1px solid black', marginBottom: '1em' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<input type='checkbox' onChange={onCheck} checked={!!completed} /> <span>{title}</span>{' '}
					<button onClick={remove}>Delete</button>
				</div>
				<p>Note: {notes}</p>
			</section>
		</li>
	);
};
