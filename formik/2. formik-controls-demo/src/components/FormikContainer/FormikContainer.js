import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormikControl from '../FormikControl/FormikControl';

function FormikContainer () {
	const dropDownOptions = [
		{ key: 'Select an option', value: '' },
		{ key: 'option 1', value: 'option 1' },
		{ key: 'option 2', value: 'option 2' },
		{ key: 'option 3', value: 'option 3' }
	];

	const radioOptions = [
		{ key: 'option 1', value: 'rOption 1' },
		{ key: 'option 2', value: 'rOption 2' },
		{ key: 'option 3', value: 'rOption 3' }
	];

	const checkboxOptions = [
		{ key: 'option 1', value: 'cOption 1' },
		{ key: 'option 2', value: 'cOption 2' },
		{ key: 'option 3', value: 'cOption 3' }
	];

	const initialValues = {
		email: '',
		description: '',
		selectOption: '',
		radioOption: '',
		checkboxOption: [],
		birthDate: null
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid Email Format').required('Required'),
		description: Yup.string().required('Required'),
		selectOption: Yup.string().required('Required'),
		radioOption: Yup.string().required('Required'),
		checkboxOption: Yup.array().required('Required'),
		birthDate: Yup.date().required('Required').nullable()
	});

	const onSubmit = values => {
		console.log('Form data', values);
		console.log('Saved data', JSON.parse(JSON.stringify(values)));
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{formik => (
				<Form>
					<h3>Example</h3>
					<FormikControl control='input' type='email' label='Email' name='email' />
					<FormikControl control='textarea' label='Description' name='description' />
					<FormikControl
						control='select'
						label='Select a topic'
						name='selectOption'
						options={dropDownOptions}
					/>
					<FormikControl control='radio' label='Radio Topic' name='radioOption' options={radioOptions} />
					<FormikControl
						control='checkbox'
						label='Checkbox Topics'
						name='checkboxOption'
						options={checkboxOptions}
					/>
					<FormikControl control='date' label='Pick a date' name='birthDate' />
					<button type='submit'>Submit</button>
				</Form>
			)}
		</Formik>
	);
}

export default FormikContainer;
