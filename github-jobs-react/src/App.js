import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';

import useFetchJobs from './useFetchJobs';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import LoadingSpinner from './Spinner';

const App = () => {
	const [ params, setParams ] = useState({});
	const [ page, setPage ] = useState(1);
	const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

	const handleParamChange = event => {
		const param = event.target.name;
		const value = event.target.value;
		setPage(1);
		setParams(prevParams => {
			return { ...prevParams, [param]: value };
		});
	};
	return (
		<Container className='my-4'>
			<h1 className='mb-4'>Github Jobs</h1>
			<SearchForm params={params} onParamChange={handleParamChange} />

			{loading && <LoadingSpinner />}
			{error && <Alert variant='danger'>{error.toString()} </Alert>}

			{!loading &&
			!error && (
				<React.Fragment>
					<JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
					{jobs.map(job => {
						return (
							<Job key={job.id} job={job}>
								{job}
							</Job>
						);
					})}
					<JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
				</React.Fragment>
			)}
		</Container>
	);
};

export default App;
