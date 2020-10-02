import React from 'react';

import Input from '../Fields/Input';
import Radio from '../Fields/Radio';
import Select from '../Fields/Select';
import TextArea from '../Fields/TextArea';
import Checkbox from '../Fields/Checkbox';
import Datepicker from '../Fields/Datepicker';
import ChakraInput from '../Fields/ChakraInput/ChakraInput';

function FormikControl (props) {
	const { control, ...rest } = props;

	switch (control) {
		case 'input':
			return <Input {...rest} />;

		case 'textarea':
			return <TextArea {...rest} />;
		case 'select':
			return <Select {...rest} />;
		case 'radio':
			return <Radio {...rest} />;
		case 'checkbox':
			return <Checkbox {...rest} />;
		case 'date':
			return <Datepicker {...rest} />;
		case 'chakrainput':
			return <ChakraInput {...rest} />;
		default:
			return null;
	}
}

export default FormikControl;
