import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingScreen from '../components/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading message', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });
});
