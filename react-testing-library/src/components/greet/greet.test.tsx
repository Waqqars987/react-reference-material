import { render, screen } from '@testing-library/react';
import { Greet } from './greet';

describe.skip('Greet', () => {
	test('renders correctly', () => {
		render(<Greet />);
		const textElement = screen.getByText(/Hello/);
		expect(textElement).toBeInTheDocument();
	});
});

describe.skip('Nested', () => {
	test('renders a name', () => {
		render(<Greet name='Waqqar' />);
		const textElement = screen.getByText(/hello waqqar/i);
		expect(textElement).toBeInTheDocument();
	});
});
