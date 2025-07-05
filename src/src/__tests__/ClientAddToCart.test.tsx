import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientAddToCart from '../components/ClientAddToCart';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  description: 'A great product',
  price: 99.99,
  images: ['/test.jpg'],
  colors: [],
  keyFeatures: [],
};

describe('ClientAddToCart', () => {
  it('renders add to cart button', () => {
    render(<ClientAddToCart product={mockProduct} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
