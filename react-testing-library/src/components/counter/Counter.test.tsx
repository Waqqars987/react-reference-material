import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';
import user from '@testing-library/user-event';

describe('Counter', () => {
	test('renders correctly', () => {
		render(<Counter />);
		const countElement = screen.getByRole('heading', { level: 1 });
		expect(countElement).toBeInTheDocument();

		const incrementButton = screen.getByRole('button', { name: 'Increment' });
		expect(incrementButton).toBeInTheDocument();
	});

	test('renders a count of 0', () => {
		render(<Counter />);
		const countElement = screen.getByRole('heading', { level: 1 });
		expect(countElement).toHaveTextContent('0');
	});

	test('renders a count of 1 after clicking the increment button', async () => {
		user.setup();
		render(<Counter />);
		const incrementButton = screen.getByRole('button', { name: 'Increment' });
		await user.click(incrementButton);

		const countElement = screen.getByRole('heading', { level: 1 });
		expect(countElement).toHaveTextContent('1');
	});

	test('renders a count of 2 after clicking the increment button twice', async () => {
		user.setup();
		render(<Counter />);
		const incrementButton = screen.getByRole('button', { name: 'Increment' });
		await user.click(incrementButton);
		await user.click(incrementButton);

		const countElement = screen.getByRole('heading', { level: 1 });
		expect(countElement).toHaveTextContent('2');
	});

	test('renders a count of 10 after clicking the Set button', async () => {
		user.setup();
		render(<Counter />);
		const amountInput = screen.getByRole('spinbutton');
		await user.type(amountInput, '10');
		expect(amountInput).toHaveValue(10);

		const setButton = screen.getByRole('button', { name: 'Set' });
		await user.click(setButton);

		const countElement = screen.getByRole('heading', { level: 1 });
		expect(countElement).toHaveTextContent('10');
	});

	test('elements are focused in the right order', async () => {
		user.setup();
		render(<Counter />);
		const amountInput = screen.getByRole('spinbutton');
		const setButton = screen.getByRole('button', { name: 'Set' });
		const incrementButton = screen.getByRole('button', { name: 'Increment' });

		await user.tab();
		expect(incrementButton).toHaveFocus();

		await user.tab();
		expect(amountInput).toHaveFocus();

		await user.tab();
		expect(setButton).toHaveFocus();
	});
});
