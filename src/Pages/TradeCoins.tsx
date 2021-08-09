import * as React from 'react';
import { RouteComponentProps } from 'react-router'; 
import { Link } from 'react-router-dom';

//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {}

const TradeCoins = ({ history }: Props) => {
    return (
    <div>
        <header>
            <nav>
            <Link to="/SignIn">Sign in</Link>
            <Link to="/Multiplication">Multiplication</Link>
            <Link to="/Challenge">Send Challenge</Link>
            <Link to="TradeCoins" className='currentpage'>Trade coins</Link>
            <Link to="/CreateAccount">Create account</Link>
            <Link to='/'>Math Game</Link>
            </nav>
        </header>
        <div>
            This should display a few pictures with toggle buttons underneath and coins necessary next to them
        </div>
    </div> 
    );
};

export default TradeCoins;