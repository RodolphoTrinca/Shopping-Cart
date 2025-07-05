import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorScreen from '../components/ErrorScreen';

describe('ErrorScreen', () => {
  it('renders error message', () => {
    render(<ErrorScreen message="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
