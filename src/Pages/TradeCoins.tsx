//import * as React from 'react';
import { RouteComponentProps } from 'react-router'; 
import NavBar from '../components/NavBar';
import axios from 'axios';
import React, { useState } from 'react';

import SPACE from '../images/spacepic.jpg';
import CUTE from '../images/cute.jpg';
import BANDW from '../images/blackandwhite.jpg';
import DOGMOON from '../images/dogandmoon.jpg';
import UNICORNS from '../images/skatingunicorns.jpg';
import LAND from '../images/spacelandscape.jpg';
import DUCK from '../images/blueduck.jpg';
import BOOM from '../images/boompow.jpg';
import ELEPHANTS from '../images/elephants.jpg';

import { LoggedInUser } from '../Router';


//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    loggedInUser: LoggedInUser|null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUser|null>>;
    coins: number;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
}

const TradeCoins = ({ setTheme, theme, coins, setCoins, loggedInUser, setLoggedInUser }: Props) => {
    const [notSuccess, setNotSuccess] = useState(false)

    const tradeCoins = (theme: string, price: number) => {
        if ((coins + (loggedInUser?.coins ?? 0)) >= price) {
            setTheme(theme);
            setCoins(coins - price)

            if (loggedInUser !== null) {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/${loggedInUser.id}/deposit`, { "amount": (coins - price) } )
                .then( (response) => {
                    console.log('off to db');
                    setCoins(0);
                    saveTheme(theme);
                })
                .catch( (error) => {
                    console.log(error.response);
                });
            } 
            setNotSuccess(false)
        } else {
            setNotSuccess(true);
        }
    }; 
    
    const saveTheme = (theme: string) => {
        if (loggedInUser !== null) {
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/${loggedInUser.id}`, {"theme": theme} )
            .then( (response) => {
                console.log('off to db');
                setLoggedInUser(response.data.user);
            })
            .catch( (error) => {
                console.log(error.response);
            });
        }
    };


    return (
    <div>
        <NavBar />
        <main>
            {notSuccess !== false ? (<p id='nomoney'>Sorry, you don't have enough coins.</p>): null }
            <div className='choices'>
                <div className='nocoins'>
                    <div id='first'>
                    <img src={SPACE} alt="" id='space'/>
                    <p>0 coins</p>
                    <button onClick={() => tradeCoins('space', 0)}>Trade coins</button>
                    </div>
                    <div>
                    <img src={CUTE} alt="cute" id='cute'/>
                    <p>0 coins</p>
                    <button onClick={() => tradeCoins('cute', 0)}>Trade coins</button>
                    </div>
                    <div>
                    <img src={DOGMOON} alt="dogandthemoon" id='dogmoon' />
                    <p>0 coins</p>
                    <button onClick={() => tradeCoins('dogmoon', 0)}>Trade coins</button>
                    </div>
                </div>


                <div className='thousanscoins'>
                    <div>
                    <img src={BANDW} alt="blackandwhite" id='bandw' />
                    <p>1000 coins</p>
                    <button onClick={() => tradeCoins('bandw', 1000)}>Trade coins</button>
                    </div>
                    <div>
                    <img src={UNICORNS} alt="skatingunicorns" id='unicorns' />
                    <p>1000 coins</p>
                    <button onClick={() => tradeCoins('unicorns', 1000)}>Trade coins</button>
                    </div>
                    <div>
                    <img src={LAND} alt="spacelandscape" id='land' />
                    <p>1000 coins</p>
                    <button onClick={() => tradeCoins('land', 1000)}>Trade coins</button>
                    </div>
                </div>


                <div className='tenthou'>
                    <div>
                    <img src={DUCK} alt="blueduck" id='duck' />
                    <p>10000 coins</p>
                    <button onClick={() => tradeCoins('duck', 10000)}>Trade coins</button>
                    </div>
                    <div>
                    <img src={BOOM} alt="boomboompow" id='boom' />
                    <p>10000 coins</p>
                    <button onClick={() => tradeCoins('boom', 10000)}>Trade coins</button>
                    </div>
                    <div>
                    <img src={ELEPHANTS} alt="fourelephants" id='elephants' />
                    <p>10000 coins</p>
                    <button onClick={() => tradeCoins('elephants', 10000)}>Trade coins</button>
                    </div>
                </div>
                

            </div>
        </main>
    </div> 
    );
};

export default TradeCoins;