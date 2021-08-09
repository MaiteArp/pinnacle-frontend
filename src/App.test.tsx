import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history' // from the page on testing

import App from './App';
import Home from './Pages/Home';
import Router from './Router';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('App has a "begin" button', () => {
  //Arrange-Act
  const history = createMemoryHistory()
  history.push('/')
  render(
    <Router />
  )
  const beginButton = screen.getByText('BEGIN');
  //Assert
  expect(beginButton).toBeInTheDocument();
});


test('App has "multiplication" link', () => {
  //Arrange-Act
  const history = createMemoryHistory()
  history.push('/')
  render(
    <Router />
  )
  const multiplicationLink = screen.getByText('Multiplication');
  //Assert
  expect(multiplicationLink).toBeInTheDocument();
});


test('App has "00 sec" time', () => {
  //Arrange-Act
  const history = createMemoryHistory()
  history.push('/')
  render(
    <Router />
  )
  const secTime = screen.getByText('00 sec');
  //Assert
  expect(secTime).toBeInTheDocument();
});


test('App has "0 coins" treasure', () => {
  //Arrange-Act
  const history = createMemoryHistory()
  history.push('/')
  render(
    <Router />
  )
  const noCoins = screen.getByText('0 coins');
  //Assert
  expect(noCoins).toBeInTheDocument();
});


test('App has "enter a number" input', () => {
  //Arrange-Act
  const history = createMemoryHistory()
  history.push('/')
  render(
    <Router />
  )
  const enterNumber = screen.getByPlaceholderText('enter a number');
  //Assert
  expect(enterNumber).toBeInTheDocument();
});