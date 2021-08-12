import * as React from 'react';
import { RouteComponentProps} from 'react-router'; 
import { Link } from 'react-router-dom';

//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {}

const Challenge = ({ history }: Props) => {
    return (
    <div>
        <header>
            <nav>
            <Link to="/SignIn">Sign in</Link>
            <Link to="/Multiplication">Multiplication</Link>
            <Link to="Challenge" className='currentpage'>Send Challenge</Link>
            <Link to="/TradeCoins">Trade coins</Link>
            <Link to="/CreateAccount">Create account</Link>
            <Link to='/'>Math Game</Link>
            </nav>
        </header>

        <div>
            <section>
                <h2>Please log in to your account to send a challenge</h2>
                <label>User to challenge:</label>
                <input
                placeholder='username'
                required
                />
                <button> Send </button>
            </section>
            <section>
                <h2>You have {'some number'} challenges</h2>
            </section>
        </div>
    </div> //I want this to be buttons
    );
};

export default Challenge;