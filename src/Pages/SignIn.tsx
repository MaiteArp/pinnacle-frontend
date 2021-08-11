//import * as React from 'react';
import axios from 'axios';

import React, { useState } from 'react';
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


const SignIn = ({ loggedInUser, setLoggedInUser }: Props) => {
    const [loginFields, setLoginFields] = useState<UserData>({
        name: '',
        password: ''
    });

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFields({
            ...loginFields,
            name: event.target.value
        });
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFields({
            ...loginFields,
            password: event.target.value
        });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await getExistingUser(loginFields);
        setLoginFields({
            name: '',
            password: ''
        }); 
    };
    
    const getExistingUser = (userData: UserData) => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, userData, 
            {
                params: {
                    format: 'json',
                }
            })
            .then( (response) => {
                setLoggedInUser(response.data);
                console.log('found user')
            })
            .catch( (error) => {
                console.log('error getting user');
                console.log(error.response)
            });
    }; // gotta display coins and best time, maybe *'Bob's* Math Game'


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
                <div>
                    <input 
                    name='name'
                    id='name'
                    type='name'
                    placeholder='Username'
                    onChange={onNameChange}
                    required
                    />
                    <input 
                    name='password'
                    id='passwrod'
                    type='password'
                    placeholder='Password'
                    onChange={onPasswordChange}
                    required
                    />
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    </div> 
    );
};

export default SignIn;