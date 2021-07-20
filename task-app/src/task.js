import { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
	padding: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	margin-bottom: 8px;
	background-color: ${props => (props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'white')};
	display: flex;
`;

// const Handle = styled.div`
// 	width: 20px;
// 	height: 20px;
// 	background-color: orange;
// 	border-radius: 4px;
// 	margin-right: 8px;
// `;

class Task extends Component {
	render () {
		const isDragDisabled = this.props.task.id === 'task-1';
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={isDragDisabled}>
				{(provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						innerRef={provided.innerRef}
						isDragging={snapshot.isDragging}
						isDragDisabled={isDragDisabled}
						aria-roledescription='Press space bar to lift the task'
					>
						{/* <Handle {...provided.dragHandleProps} /> */}
						{this.props.task.content}
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Task;
