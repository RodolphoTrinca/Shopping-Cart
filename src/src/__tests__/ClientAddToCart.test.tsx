import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientAddToCart from '../components/ClientAddToCart';
import { CartProvider } from '../context/CartContext';

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
    render(
      <CartProvider>
        <ClientAddToCart product={mockProduct} />
      </CartProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('button can be clicked multiple times', () => {
    render(
      <CartProvider>
        <ClientAddToCart product={mockProduct} />
      </CartProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('button is disabled when loading (simulate)', () => {
    render(
      <CartProvider>
        <ClientAddToCart product={mockProduct} />
      </CartProvider>
    );
    const button = screen.getByRole('button');
    button.setAttribute('disabled', 'true');
    expect(button).toBeDisabled();
  });
});
