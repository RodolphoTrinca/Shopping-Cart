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
});
