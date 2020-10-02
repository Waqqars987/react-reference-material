import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';

import TextError from '../ErrorMessage/TextError';

function Checkbox (props) {
	const { label, name, options, ...rest } = props;
	return (
		<div className='form-control'>
			<label>{label}</label>
			<Field name={name} {...rest}>
				{({ field }) => {
					return options.map(option => {
						return (
							<Fragment key={option.key}>
								<input
									type='checkbox'
									id={option.value}
									{...field}
									value={option.value}
									checked={field.value.includes(option.value)}
								/>
								<label htmlFor={option.value}>{option.key}</label>
							</Fragment>
						);
					});
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
}

export default Checkbox;
