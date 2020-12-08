import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './components/app/App';

//TODO I have problems running the app, with the external libs :/
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Here Location Lookup/i);
  expect(linkElement).toBeInTheDocument();
});
