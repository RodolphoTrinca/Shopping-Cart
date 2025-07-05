import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckoutPage from '../app/checkout/page';

describe('CheckoutPage', () => {
  it('renders checkout title', () => {
    render(<CheckoutPage />);
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  });
});
