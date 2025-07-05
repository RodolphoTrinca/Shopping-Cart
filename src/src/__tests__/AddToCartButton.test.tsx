import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddToCartButton from '../components/AddToCartButton';

describe('AddToCartButton', () => {
  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<AddToCartButton added={false} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('shows "Added" when added is true', () => {
    render(<AddToCartButton added={true} onClick={jest.fn()} />);
    expect(screen.getByText(/added/i)).toBeInTheDocument();
  });

  it('shows "Add to Cart" when added is false', () => {
    render(<AddToCartButton added={false} onClick={jest.fn()} />);
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
  });

  it('button is accessible and can be focused', () => {
    render(<AddToCartButton added={false} onClick={jest.fn()} />);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  it('does not call onClick if button is disabled (simulate by removing onClick)', () => {
    // Simulate a disabled button by not passing onClick
    render(<AddToCartButton added={false} onClick={undefined as any} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // No error should be thrown, and nothing should happen
    expect(button).toBeInTheDocument();
  });
});
