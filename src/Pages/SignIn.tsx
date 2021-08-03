import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router'; 
import { Link } from 'react-router-dom';

//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {}

const SignIn = ({ history }: Props) => {
    return (
    <div>
        <Link to="/SignIn">Sign in</Link>
        <Link to="/Multiplication">Multiplication</Link>
    </div> //I want this to be buttons
    );
};

export default SignIn;