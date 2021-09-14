import { useRef } from 'react';

import './App.css';

function MultipleInputs() {
	const inputsWrapper = useRef(null);

	const handleInput = event => {
		const input = event.target;
		if (isNaN(input.value)) {
			input.value = '';
			return;
		}
		input.nextElementSibling && input.value && input.nextElementSibling.focus();
	};

	const handlePaste = event => {
		const paste = event.clipboardData.getData('text');
		const inputs = inputsWrapper.current.childNodes;
		inputs.forEach((input, i) => {
			input.value = paste[i] || '';
		});
	};

	return (
		<form name='verify' onSubmit={() => {}}>
			<div className='inputs' onChange={handleInput} ref={inputsWrapper}>
				<input type='text' name='n1' maxLength={1} onPaste={handlePaste} autoFocus />
				<input type='text' name='n2' maxLength={1} />
				<input type='text' name='n3' maxLength={1} />
				<input type='text' name='n4' maxLength={1} />
				<input type='text' name='n5' maxLength={1} />
				<input type='text' name='n6' maxLength={1} />
			</div>
			<input type='submit' value='Verify' />
		</form>
	);
}

export default MultipleInputs;
