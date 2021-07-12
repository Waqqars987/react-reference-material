import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './column';

const Container = styled.div`display: flex;`;

class InnerList extends PureComponent {
	// shouldComponentUpdate (nextProps) {
	// 	if (
	// 		nextProps.column === this.props.column &&
	// 		nextProps.taskMap === this.props.taskMap &&
	// 		nextProps.index === this.props.index
	// 	) {
	// 		return false;
	// 	}
	// 	return true;
	// }
	render () {
		const { column, taskMap, index } = this.props;
		const tasks = column.taskIds.map(taskId => taskMap[taskId]);
		const isDropDisabled = index < this.state.homeIndex;
		return <Column column={column} tasks={tasks} index={index} isDropDisabled={isDropDisabled} />;
	}
}

class App extends Component {
	state = initialData;

	onDragStart = (start, provided) => {
		// document.body.style.color = 'orange';
		// document.body.style.transition = 'background-color 0.2s ease';
		provided.announce(`You have lifted the task in position ${start.source.index + 1} `);
		const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
		this.setState({
			homeIndex
		});
	};

	onDragUpdate = (update, provided) => {
		const message = update.destination
			? `You have moved the task to position ${update.destination.index + 1} `
			: `You are currently not over a droppable area`;
		provided.announce(message);
		// const { destination } = update;
		// const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
		// document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
	};

	onDragEnd = (result, provided) => {
		const message = result.destination
			? `You have moved the task from position ${result.source.index + 1} to ${result.destination.index + 1}`
			: `The task has been returned to its starting postion of ${result.source.index + 1}`;
		provided.announce(message);
		// document.body.style.color = 'inherit';
		// document.body.style.backgroundColor = 'inherit';
		this.setState({
			homeIndex: null
		});
		const { destination, source, draggableId, type } = result;

		if (!destination) return;

		if (destination.draggableId === source.draggableId && destination.index === source.index) return;

		if (type === 'column') {
			const newColumnOrder = Array.from(this.state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);
			const newState = {
				...this.state,
				columnOrder: newColumnOrder
			};
			this.setState(newState);
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			const newColumn = {
				...start,
				taskIds: newTaskIds
			};
			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn
				}
			};
			this.setState(newState);
			return;
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		};
		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};
		this.setState(newState);
	};

	render () {
		return (
			<DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate}>
				<Droppable droppableId='all-columns' direction='horizontal' type='column'>
					{provided => {
						<Container {...provided.droppableProps} ref={provided.innerRef} innerRef={provided.innerRef}>
							{this.state.columnOrder.map((columnId, index) => {
								const column = this.state.columns[columnId];
								return (
									<InnerList
										key={column.id}
										column={column}
										taskMap={this.state.tasks}
										index={index}
									/>
								);
							})}
							{provided.placeholder}
						</Container>;
					}}
				</Droppable>
			</DragDropContext>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);