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

  it('renders fallback image if images array is empty', () => {
    const productNoImage = { ...mockProduct, images: [] };
    render(<ProductCard product={productNoImage} onAddToCart={jest.fn()} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/fallback.jpg');
  });

  it('handles long product titles gracefully', () => {
    const longTitle = 'A'.repeat(200);
    render(<ProductCard product={{ ...mockProduct, title: longTitle }} onAddToCart={jest.fn()} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('button is accessible and can be focused', () => {
    render(<ProductCard product={mockProduct} onAddToCart={jest.fn()} />);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
