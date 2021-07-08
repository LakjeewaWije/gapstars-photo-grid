import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('view photo grid page', () => {
  render(<App />);
  const labelElement = screen.getByText(/Your Favourites!/i);
  expect(labelElement).toBeInTheDocument();
});

