import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(
        (content) =>
          content.includes(`© ${year}`) &&
          content.toLowerCase().includes('shopping cart') &&
          content.toLowerCase().includes('all rights reserved')
      )
    ).toBeInTheDocument();
  });
});
