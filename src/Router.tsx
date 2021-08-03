import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import Multiplication from './Pages/Multiplication';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
            <Route path="/Multiplication" component={Multiplication} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;