import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import { SearchProvider } from '../context/SearchContext';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  it('renders the site title', () => {
    render(
      <CartProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
      </CartProvider>
    );
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  it('shows cart badge when items are in cart', () => {
    // Mock cart state with items
    const mockState = { items: [{ id: '1', title: 'A', description: '', price: 1, quantity: 2, images: [], colors: [], keyFeatures: [] }] };
    jest.spyOn(require('../context/CartContext'), 'useCart').mockReturnValue({ state: mockState });
    render(
      <CartProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
      </CartProvider>
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('search input updates context', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(
      <CartProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
      </CartProvider>
    );
    const input = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(input, { target: { value: 'shoes' } });
    expect(input).toHaveValue('shoes');
  });
});
