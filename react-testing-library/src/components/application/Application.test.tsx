import { render, screen } from '@testing-library/react';
import { Application } from './Application';

describe('Application', () => {
	test('renders correctly', () => {
		render(<Application />);

		const pageHeading = screen.getByRole('heading', {
			name: 'Job application form',
			level: 1
		});
		expect(pageHeading).toBeInTheDocument();

		const sectionHeading = screen.getByRole('heading', {
			name: 'Section 1',
			level: 2
		});
		expect(sectionHeading).toBeInTheDocument();

		const paragraphElement = screen.getByText('All fields are mandatory', {
			selector: 'p' // can be used if multiple elements have the same text content
		});
		expect(paragraphElement).toBeInTheDocument();

		const closeElement = screen.getByTitle('close');
		expect(closeElement).toBeInTheDocument();

		const imageElement = screen.getByAltText('a person with a laptop');
		expect(imageElement).toBeInTheDocument();

		const customElement = screen.getByTestId('custom-element'); // match "data-testid" attribute
		expect(customElement).toBeInTheDocument();

		const nameElement = screen.getByRole('textbox', { name: 'Name' });
		expect(nameElement).toBeInTheDocument();

		const nameElement2 = screen.getByLabelText('Name', {
			selector: 'input' // can be used if multiple elements have the same label
		});
		expect(nameElement2).toBeInTheDocument();

		const nameElement3 = screen.getByPlaceholderText('Fullname');
		expect(nameElement3).toBeInTheDocument();

		const nameElement4 = screen.getByDisplayValue('Waqqar');
		expect(nameElement4).toBeInTheDocument();

		const bioElement = screen.getByRole('textbox', { name: 'Bio' });
		expect(bioElement).toBeInTheDocument();

		const jobLocationElement = screen.getByRole('combobox');
		expect(jobLocationElement).toBeInTheDocument();

		const termsElement = screen.getByRole('checkbox');
		expect(termsElement).toBeInTheDocument();

		const termsElement2 = screen.getByLabelText('I agree to the terms and conditions');
		expect(termsElement2).toBeInTheDocument();

		const submitButtonElement = screen.getByRole('button');
		expect(submitButtonElement).toBeInTheDocument();
		expect(submitButtonElement).toBeDisabled();
	});
});
