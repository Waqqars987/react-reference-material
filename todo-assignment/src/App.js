import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from './components/Button/Button';
import Input from './components/Input/Input';
import './App.css';

const App = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');
	const [todoEditing, setTodoEditing] = useState(null);
	const [editingText, setEditingText] = useState('');

	useEffect(() => {
		const loadedTodos = JSON.parse(localStorage.getItem('todos'));
		setTodos(loadedTodos);
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleSubmit = e => {
		e.preventDefault();
		const newTodo = {
			id: uuidv4(),
			text: todo,
			completed: false,
		};
		setTodos([...todos].concat(newTodo));
		setTodo('');
	};

	const deleteTodo = id => {
		const updatedTodos = [...todos].filter(todo => todo.id !== id);
		setTodos(updatedTodos);
	};

	const toggleComplete = id => {
		const updatedTodos = [...todos].map(todo => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const submitEdits = id => {
		const updatedTodos = [...todos].map(todo => {
			if (todo.id === id) {
				todo.text = editingText;
			}
			return todo;
		});
		setTodos(updatedTodos);
		resetEditing();
	};

	const resetEditing = () => {
		setTodoEditing(null);
		setEditingText('');
	};

	return (
		<div className='todo-list'>
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
				<Input type='text' setter={setTodo} value={todo} autoFocus={true} />
				<Button type='submit' disabled={!todo.trim().length}>
					Add
				</Button>
			</form>

			{todos &&
				todos.map(todo => (
					<div key={todo.id} className='todo'>
						<div className='todo-text'>
							<Input
								type='checkbox'
								setter={toggleComplete}
								value={todo.completed}
								param={todo.id}
							/>
							{todo.id === todoEditing ? (
								<Input type='text' setter={setEditingText} value={editingText} autoFocus={true} />
							) : (
								<div className={todo.completed ? 'todo--completed ' : ''}>{todo.text}</div>
							)}
						</div>

						<div className='todo-actions'>
							{todo.id === todoEditing ? (
								<div>
									<Button
										onClick={submitEdits}
										param={todo.id}
										disabled={!editingText.trim().length}
									>
										Save
									</Button>
									<Button onClick={resetEditing}>Cancel</Button>
								</div>
							) : (
								<Button onClick={setTodoEditing} param={todo.id}>
									Edit
								</Button>
							)}
							<Button onClick={deleteTodo} param={todo.id}>
								Delete
							</Button>
						</div>
					</div>
				))}

			{todos.length === 0 && <p className='todo--not-found'>No todo found, please create one!</p>}
		</div>
	);
};

export default App;
