import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router'; 
import { Link } from 'react-router-dom';

//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {}

const CreateAccount = ({ history }: Props) => {
    return (
    <div>
        <nav>
        <Link to="/SignIn">Sign in</Link>
        <Link to="/Multiplication">Multiplication</Link>
        <Link to="/Challenge">Challenge</Link>
        <Link to="/TradeCoins">Trade coins</Link>
        <Link to="CreateAccount">Create account</Link>
        <Link to='/'>Math Game</Link>
        </nav>

        <div>
            Creating an account fields
        </div>
    </div> //I want this to be buttons
    );
};

export default CreateAccount;
