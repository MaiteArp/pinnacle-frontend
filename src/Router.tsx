import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

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
export type ChallengeData = { 
    id: number; 
    winner: number; 
    challenger_id: number; 
    destination_id: number;
} //might need to add that best_time



const Router = () => {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser|null>(null);
    const [coins, setCoins] = useState(0);
    //const [challengeData, setChallengeData] = useState<ChallengeData|null>(null);
    const [inChallenge, setInChallenge] = useState<ChallengeData|null>(null);
    //const [outChallenge, setOutChallenge] = useState<ChallengeData|null>(null);

    const checkChallenge = () => {
        if (loggedInUser !== null) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/challenges/check/${loggedInUser.id}`)
            .then( (response) => {
                console.log('trying to get challenge');
                let chall = response.data.challenges?.[0]
                setInChallenge(chall); 
                console.log("chall =", chall)
            })
            .catch( (error) => {
                console.log(error.response)
            })
        }
    }; // answer will just grab state from next game 

    return (
        <BrowserRouter>
            <Switch>
            <Route path="/SignIn" render={(props) => (<SignIn {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> )} />
            <Route path="/Multiplication" component={Multiplication} />
            <Route path="/Challenge" render={(props) => (<Challenge {...props} loggedInUser={loggedInUser} inChallenge={inChallenge} 
            checkChallenge={checkChallenge} /> )} />
            <Route path="/TradeCoins" component={TradeCoins} />
            <Route path="/CreateAccount" component={CreateAccount} />
            <Route path="/" render={(props) => (<Home {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} coins={coins} 
            setCoins={setCoins} inChallenge={inChallenge} checkChallenge={checkChallenge} />)} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;

// outChallenge={outChallenge}