import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Multiplication from './Pages/Multiplication';
import SignIn from './Pages/SignIn';
import Challenge from './Pages/Challenge';
import TradeCoins from './Pages/TradeCoins';
import CreateAccount from './Pages/CreateAccount';
import Home from './Pages/Home';


export type LoggedInUser = { 
    id: number;
    name: string;
    coins: number;
    best_time: number;
}


const Router = () => {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser|null>(null);

    return (
        <BrowserRouter>
            <Switch>
            <Route path="/SignIn" render={(props) => (<SignIn {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> )} />
            <Route path="/Multiplication" component={Multiplication} />
            <Route path="/Challenge" component={Challenge} />
            <Route path="/TradeCoins" component={TradeCoins} />
            <Route path="/CreateAccount" component={CreateAccount} />
            <Route path="/" render={(props) => (<Home {...props} loggedInUser={loggedInUser} />)} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;