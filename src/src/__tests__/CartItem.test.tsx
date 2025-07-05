import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItemComponent from '../components/CartItem';

const mockItem = {
  id: '1',
  title: 'Test Item',
  description: 'desc',
  price: 10,
  quantity: 2,
  images: ['/test.jpg'],
  colors: [],
  keyFeatures: [],
};

describe('CartItem', () => {
  it('renders item title and price', () => {
    render(
      <CartItemComponent
        item={mockItem}
        onRemove={jest.fn()}
        onUpdateQuantity={jest.fn()}
      />
    );
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('USD 10.00')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(
      <CartItemComponent
        item={mockItem}
        onRemove={onRemove}
        onUpdateQuantity={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Remove item'));
    expect(onRemove).toHaveBeenCalledWith('1');
  });

  it('handles zero quantity gracefully', () => {
    render(
      <CartItemComponent
        item={{ ...mockItem, quantity: 0 }}
        onRemove={jest.fn()}
        onUpdateQuantity={jest.fn()}
      />
    );
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  });

  it('handles negative quantity gracefully', () => {
    render(
      <CartItemComponent
        item={{ ...mockItem, quantity: -5 }}
        onRemove={jest.fn()}
        onUpdateQuantity={jest.fn()}
      />
    );
    expect(screen.getByDisplayValue('-5')).toBeInTheDocument();
  });

  it('renders fallback image if images array is empty', () => {
    render(
      <CartItemComponent
        item={{ ...mockItem, images: [] }}
        onRemove={jest.fn()}
        onUpdateQuantity={jest.fn()}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/fallback.jpg');
  });

  it('input is accessible and can be focused', () => {
    render(
      <CartItemComponent
        item={mockItem}
        onRemove={jest.fn()}
        onUpdateQuantity={jest.fn()}
      />
    );
    const input = screen.getByLabelText(/quantity/i);
    input.focus();
    expect(input).toHaveFocus();
  });
});
