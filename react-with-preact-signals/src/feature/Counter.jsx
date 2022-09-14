import Button from '../components/Button';
import Output from '../components/Output';
import { count } from '../store';

function Counter() {
	console.log('🚀 ~ Counter ~ Render');
	return (
		<>
			<h2>Counter</h2>

			<section>
				<div>
					<Button onClick={() => count.value++}>+</Button>
					<Button onClick={() => count.value--}>-</Button>
				</div>

				<Output>{count}</Output>
			</section>
		</>
	);
}

export default Counter;
