import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history' // from the page on testing

import App from './App';
import Home from './Pages/Home';
import Router from './Router';
import { Router as BaseRouter, Route } from 'react-router';

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('mocks axios', () => {
  let mock: any; 
  
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

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


test('App home screen has name', () => {
  //Arrange-Act
  const history = createMemoryHistory()
  history.push('/')
  let user = {
    "id": 1,
    "name": "bob",
    "coins": 100,
    "best_time": 89,
    "theme": "space",
  }
  mock.onPost(`${process.env.REACT_APP_BACKEND_URL}/users/1/deposit`).reply(200, {"user": user});
  let ignoreSet = (arg?: any) => {};
  render(
    <BaseRouter history={history}> 
      <Route path="*" render={
        (props) => (<Home {...props} setInChallenge={ignoreSet} outChallenge={null} setOutChallenge={ignoreSet}  loggedInUser={user} setLoggedInUser={ignoreSet} coins={100} 
          setCoins={ignoreSet} setTheme={ignoreSet} inChallenge={null} checkChallenge={ignoreSet} activeChallenge={null} 
          setActiveChallenge={ignoreSet}/> )} />
    </BaseRouter>
  )
  const userMathGame = screen.getByText(`${user.name}'s Math Game`);
  //Assert
  expect(userMathGame).toBeInTheDocument();
});


test('App home screen has challenge', () => {
  //Arrange-Act
  const history = createMemoryHistory()
  history.push('/')
  let user = {
    "id": 1,
    "name": "bob",
    "coins": 100,
    "best_time": 89,
    "theme": "space",
  }
  let challenge = {
    "id": 1, 
    "winner": null, 
    "winner_name": null,
    "challenger_id": 4, 
    "destination_id": user.id,
    "sent_time": 50, 
  }
  mock.onPost(`${process.env.REACT_APP_BACKEND_URL}/users/1/deposit`).reply(200, {"user": user});
  let ignoreSet = (arg?: any) => {};
  render(
    <BaseRouter history={history}>
      <Route path="*" render={
        (props) => (<Home {...props} setInChallenge={ignoreSet} outChallenge={null} setOutChallenge={ignoreSet} loggedInUser={user} setLoggedInUser={ignoreSet} coins={100} 
          setCoins={ignoreSet} inChallenge={challenge} checkChallenge={ignoreSet} activeChallenge={null} 
          setActiveChallenge={ignoreSet} setTheme={ignoreSet} /> )} />
    </BaseRouter>
  )
  const userMathGame = screen.getByText(`You've been challenged`);
  //Assert
  expect(userMathGame).toBeInTheDocument();
});
});