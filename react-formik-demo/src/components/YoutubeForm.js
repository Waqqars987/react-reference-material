import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
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

const onSubmit = values => {
	console.log(values);
};

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid Email Format').required('Required'),
	channel: Yup.string().required('Required')
});

function YoutubeForm () {
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form>
				<div className='form-control'>
					<label htmlFor='name'>Name</label>
					<Field type='text' name='name' id='name' />
					<ErrorMessage name='name' component={TextError} />
				</div>

				<div className='form-control'>
					<label htmlFor='email'>E-Mail</label>
					<Field type='email' name='email' id='email' />
					<ErrorMessage name='email'>{errorMsg => <div className='error'>{errorMsg}</div>}</ErrorMessage>
				</div>

				<div className='form-control'>
					<label htmlFor='channel'>Channel</label>
					<Field type='text' name='channel' id='channel' placeholder='Youtube Channel Name' />
					<ErrorMessage name='channel' />
				</div>

				<div className='form-control'>
					<label htmlFor='comments'>Comments</label>
					<Field as='textarea' name='comments' id='comments' />
					<ErrorMessage name='comments' />
				</div>

				<div className='form-control'>
					<label htmlFor='address'>Address</label>
					<Field name='address'>
						{props => {
							const { field, form, meta } = props;
							return (
								<div>
									<input type='text' id='address' {...field} />
									{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
								</div>
							);
						}}
					</Field>
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

				<button type='submit'>Submit</button>
			</Form>
		</Formik>
	);
}

export default YoutubeForm;
