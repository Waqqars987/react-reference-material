import React from 'react';
import DateView from 'react-datepicker';
import { Field, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

import TextError from '../ErrorMessage/TextError';

function Datepicker (props) {
	const { label, name, ...rest } = props;
	return (
		<div className='form-control'>
			<label htmlFor={name}>{label}</label>
			<Field id={name} name={name} {...rest}>
				{({ form, field }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return (
						<DateView
							id={name}
							{...field}
							{...rest}
							selected={value}
							onChange={val => setFieldValue(name, val)}
						/>
					);
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
}

export default Datepicker;
