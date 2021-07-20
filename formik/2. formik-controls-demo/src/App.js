import React from 'react';

import FormikContainer from './components/FormikContainer/FormikContainer';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import CourseEnrolmentForm from './components/CourseEnrolmentForm/CourseEnrolmentForm';
import { ThemeProvider, theme } from '@chakra-ui/core';
import './App.css';

function App () {
	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<FormikContainer />

				<LoginForm />

				<RegistrationForm />

				<CourseEnrolmentForm />
			</div>
		</ThemeProvider>
	);
}

export default App;
