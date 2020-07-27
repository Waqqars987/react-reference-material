import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
	return (
		<div className='d-flex justify-content-center align-items-center' style={{ minHeight: '45vh' }}>
			<Spinner style={{ width: '5rem', height: '5rem' }} role='status' animation='border' variant='primary' />
		</div>
	);
};

export default LoadingSpinner;
