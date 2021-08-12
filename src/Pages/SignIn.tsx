//import * as React from 'react';
import axios from 'axios';

import React, { useRef } from 'react';
import { RouteComponentProps } from 'react-router'; 
import { Link } from 'react-router-dom';
import { LoggedInUser } from '../Router';


interface Props extends RouteComponentProps { 
    loggedInUser: LoggedInUser|null, 
    setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUser|null>>
}

type UserData = {
    name: string; //type for the form
    password: string;
}


const SignIn = ({ history, loggedInUser, setLoggedInUser }: Props) => {

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await getExistingUser({
            "name": String(nameInput.current?.value),
            "password": String(passwordInput.current?.value)
        });
        
    };
    
    const nameInput = useRef<HTMLInputElement>(null); 
    const passwordInput = useRef<HTMLInputElement>(null);
    
    const getExistingUser = (userData: UserData) => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, userData, 
            {
                params: {
                    format: 'json',
                }
            })
            .then( (response) => {
                setLoggedInUser(response.data.user);
                //console.log(response.data)
                console.log(loggedInUser);
                console.log('found user');

                history.push('/');

            })
            .catch( (error) => {
                console.log('error getting user');
                console.log(error.response);
            });
    }; 


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
            <form onSubmit={onSubmit}> 
                <div className='loginform'>
                    <label>User Name:</label>
                    <input 
                    ref={nameInput}
                    name='name'
                    id='name'
                    type='name'
                    placeholder='Username'
                    required
                    />
                    <label>Password:</label>
                    <input 
                    ref={passwordInput}
                    name='password'
                    id='password'
                    type='password'
                    placeholder='Password'
                    required
                    />
                    <button type='submit' id='login'>Login</button>
                </div>
            </form>
        </div>
    </div> 
    );
};

export default SignIn;