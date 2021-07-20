import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
	name: 'Waqqar',
	email: '',
	channel: '',
	comments: '',
	address: '',
	social: {
		facebook: '',
		twitter: ''
	},
	phoneNumbers: [ '', '' ],
	phNumbers: [ '' ]
};

const savedValues = {
	name: 'Waqqar',
	email: 'waqqar@test.com',
	channel: 'wakky',
	comments: 'formik demo',
	address: 'HB Road',
	social: {
		facebook: '',
		twitter: ''
	},
	phoneNumbers: [ '', '' ],
	phNumbers: [ '' ]
};

const onSubmit = (values, onSubmitProps) => {
	console.log(values);
	console.log(onSubmitProps);
	onSubmitProps.setSubmitting(false);
	onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid Email Format').required('Required'),
	channel: Yup.string().required('Required')
	// comments: Yup.string().required('Required')
});

const validateComments = value => {
	let error;
	if (!value) error = 'Required';
	return error;
};

function YoutubeForm () {
	const [ formValues, setFormValues ] = useState(null);

	return (
		<Formik
			initialValues={formValues || initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			enableReinitialize
			// validateOnChange={false}
			// validateOnBlur={false}
			// validateOnMount
		>
			{formik => {
				console.log('Formik props', formik);
				return (
					<Form>
						<div className='form-control'>
							<label htmlFor='name'>Name</label>
							<Field type='text' name='name' id='name' />
							<ErrorMessage name='name' component={TextError} />
						</div>

						<div className='form-control'>
							<label htmlFor='email'>E-Mail</label>
							<Field type='email' name='email' id='email' />
							<ErrorMessage name='email'>
								{errorMsg => <div className='error'>{errorMsg}</div>}
							</ErrorMessage>
						</div>

						<div className='form-control'>
							<label htmlFor='channel'>Channel</label>
							<Field type='text' name='channel' id='channel' placeholder='Youtube Channel Name' />
							<ErrorMessage name='channel' />
						</div>

						<div className='form-control'>
							<label htmlFor='comments'>Comments</label>
							<Field as='textarea' name='comments' id='comments' validate={validateComments} />
							<ErrorMessage name='comments' component={TextError} />
						</div>

						<div className='form-control'>
							<label htmlFor='address'>Address</label>
							{/* Fast Field is an optimized version of the filed component which internally 
							implements the shouldComponentUpdate() to block all additional re-renders unless
					 		there are direct updates to the Fast Field form control itself.
					 		"validate" prop is available */}
							<FastField name='address'>
								{props => {
									console.log('Field render');
									const { field, form, meta } = props;
									return (
										<div>
											<input type='text' id='address' {...field} />
											{meta.touched && meta.error ? (
												<div className='error'>{meta.error}</div>
											) : null}
										</div>
									);
								}}
							</FastField>
						</div>

						<div className='form-control'>
							<label htmlFor='facebook'>Facebook Profile</label>
							<Field type='text' name='social.facebook' id='facebook' />
						</div>

						<div className='form-control'>
							<label htmlFor='twitter'>Twitter Profile</label>
							<Field type='text' name='social.twitter' id='twitter' />
						</div>

						<div className='form-control'>
							<label htmlFor='primaryPh'>Primary Phone Number</label>
							<Field type='text' name='phoneNumbers[0]' id='primaryPh' />
						</div>

						<div className='form-control'>
							<label htmlFor='secondaryPh'>Secondary Phone Number</label>
							<Field type='text' name='phoneNumbers[1]' id='secondaryPh' />
						</div>

						<div className='form-control'>
							<label htmlFor=''>List of Phone Numbers</label>
							<FieldArray name='phNumbers'>
								{fieldArrayProps => {
									const { push, remove, form } = fieldArrayProps;
									const { values } = form;
									const { phNumbers } = values;
									console.log('Form errors', form.errors);
									return (
										<div>
											{phNumbers.map((phNumber, index) => (
												<div key={index}>
													<Field name={`phNumbers[${index}]`} />
													{index > 0 && (
														<button type='button' onClick={() => remove(index)}>
															-
														</button>
													)}
													<button type='button' onClick={() => push('')}>
														+
													</button>
												</div>
											))}
										</div>
									);
								}}
							</FieldArray>
						</div>

						{/* <button type='button' onClick={() => formik.validateField('comments')}>
							Validate comments
						</button>
						<button type='button' onClick={() => formik.validateForm()}>
							Validate all
						</button>

						<button type='button' onClick={() => formik.setFieldTouched('comments')}>
							Visit comments
						</button>
						<button
							type='button'
							onClick={() =>
								formik.setTouched({
									name: true,
									email: true,
									channel: true,
									comments: true
								})}
						>
							Visit fields
						</button> */}
						<button
							type='button'
							onClick={() => {
								setFormValues(savedValues);
							}}
						>
							Load Saved Data
						</button>

						<button type='reset'>Reset</button>

						<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
							Submit
						</button>
						{/* <button type='submit' disabled={!(formik.dirty && formik.isValid)}>
							Submit
						</button> */}
					</Form>
				);
			}}
		</Formik>
	);
}

export default YoutubeForm;
