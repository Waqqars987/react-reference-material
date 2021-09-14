import { useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './App.css';

function RTG() {
	const [inProp, setInProp] = useState(false);
	const [sample, setSample] = useState('one');

	return (
		<div className='RTG'>
			<CSSTransition
				in={inProp}
				timeout={300}
				classNames='fade-slide'
				mountOnEnter
				unmountOnExit
				key={sample}
			>
				<div>Sample One</div>
			</CSSTransition>

			{/* <CSSTransition
				in={inProp && sample === 'two'}
				timeout={300}
				classNames='fade-slide'
				mountOnEnter
				unmountOnExit
				key={sample}
			>
				<div>Sample Two</div>
			</CSSTransition> */}

			<br />
			<button type='button' onClick={() => setInProp(prevIn => !prevIn)}>
				Click to Toggle Div
			</button>

			<br />
			<br />
			<button
				type='button'
				onClick={() => setSample(prevSamp => (prevSamp === 'one' ? 'two' : 'one'))}
			>
				Click to Toggle Content
			</button>
		</div>
	);
}

export default RTG;
