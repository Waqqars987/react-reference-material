import { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
	padding: 8px;
	border: 3px solid lightgrey;
	border-radius: 50%;
	margin-bottom: 8px;
	background-color: ${props => (props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'white')};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;

	&:focus {
		outline: none;
		border-color: red;
	}
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
						isDragging={snapshot.isDragging}
						isDragDisabled={isDragDisabled}
					>
						{/* <Handle {...provided.dragHandleProps} /> */}
						{this.props.task.content[0]}
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Task;
