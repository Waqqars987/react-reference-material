import { render, screen } from '@testing-library/react';
import { Greet } from '../components/greet/greet';

describe('Greet', () => {
	test('renders correctly', () => {
		render(<Greet />);
		const textElement = screen.getByText(/hello/i);
		expect(textElement).toBeInTheDocument();
	});
});

describe('Nested', () => {
	test('renders a name', () => {
		render(<Greet name='Waqqar' />);
		const textElement = screen.getByText(/hello waqqar/i);
		expect(textElement).toBeInTheDocument();
	});
});
