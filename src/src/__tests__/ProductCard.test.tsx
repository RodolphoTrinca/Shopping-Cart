import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  description: 'A great product',
  price: 99.99,
  images: ['/test.jpg'],
  colors: [],
  keyFeatures: [],
};

describe('ProductCard', () => {
  it('renders product title and description', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A great product')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const onAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
