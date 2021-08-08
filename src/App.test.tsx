import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Home from './Pages/Home';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test('App has a "begin" button', () => {
//   //Arrange-Act
//   render(<Home />);

//   const 
// })
