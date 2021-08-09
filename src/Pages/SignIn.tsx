import * as React from 'react';
import { RouteComponentProps } from 'react-router'; 
import { Link } from 'react-router-dom';

//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {}

const SignIn = ({ history }: Props) => {
    return (
    <div>
        <header>
            <nav>
            <Link to="SignIn" className='currentpage'>Sign in</Link>
            <Link to="/Multiplication">Multiplication</Link>
            <Link to="/Challenge">Send Challenge</Link>
            <Link to="/TradeCoins">Trade coins</Link>
            <Link to="/CreateAccount">Create account</Link>
            <Link to='/'>Math Game</Link>
            </nav>
        </header>

        <div>
            Stuff to log in to your account
        </div>
    </div> //I want this to be buttons?
    );
};

export default SignIn;