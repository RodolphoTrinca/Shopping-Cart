import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartPage from '../app/cart/page';

describe('CartPage', () => {
  it('renders cart title', () => {
    render(<CartPage />);
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });
});
