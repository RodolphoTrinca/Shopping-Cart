import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItemComponent from '../components/CartItem';

const mockItem = {
  id: '1',
  title: 'Test Item',
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
});
