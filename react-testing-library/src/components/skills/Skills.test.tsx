import { render, screen, logRoles } from '@testing-library/react';
import { Skills } from './Skills';

describe('Skills', () => {
	const skills = ['HTML', 'CSS', 'JavScript'];

	test('renders correctly', () => {
		render(<Skills skills={skills} />);
		const listElement = screen.getByRole('list');
		expect(listElement).toBeInTheDocument();
	});

	test('renders a list of skills', () => {
		render(<Skills skills={skills} />);
		const listItemElements = screen.getAllByRole('listitem');
		expect(listItemElements).toHaveLength(skills.length);
	});

	test('renders Login button', () => {
		render(<Skills skills={skills} />);
		const loginButton = screen.getByRole('button', {
			name: 'Login'
		});
		expect(loginButton).toBeInTheDocument();
	});

	test('Start Learning button', () => {
		render(<Skills skills={skills} />);
		// queryBy.. - wont throw error for no match instead returns null
		const startLearningButton = screen.queryByRole('button', {
			name: 'Start learning'
		});
		expect(startLearningButton).not.toBeInTheDocument();
	});

	test('Start learnig button is eventually displayed', async () => {
		const view = render(<Skills skills={skills} />);
		logRoles(view.container);
		// findBy.. - returns a promise which can be handled accordingly, default timeout is 1000ms
		screen.debug();
		const startLearningButton = await screen.findByRole(
			'button',
			{
				name: 'Start learning'
			},
			{
				timeout: 2000
			}
		);
		screen.debug();
		expect(startLearningButton).toBeInTheDocument();
	});
});
