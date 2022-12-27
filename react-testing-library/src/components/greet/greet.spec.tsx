import { render, screen } from '@testing-library/react';
import { Greet } from './greet';

describe('Greet', () => {
	it('renders correctly', () => {
		render(<Greet />);
		const textElement = screen.getByText(/hello/i);
		expect(textElement).toBeInTheDocument();
	});
});

describe('Nested', () => {
	it('renders a name', () => {
		render(<Greet name='Waqqar' />);
		const textElement = screen.getByText(/hello waqqar/i);
		expect(textElement).toBeInTheDocument();
	});
});
