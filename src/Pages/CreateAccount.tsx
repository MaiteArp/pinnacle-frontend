import axios from 'axios';
//import * as React from 'react';
import React, {useState} from "react";
import { RouteComponentProps} from 'react-router'; 
import { Link } from 'react-router-dom';
//import { ProgressPlugin } from 'webpack';
//import PropTypes from 'prop-types';


interface Props extends RouteComponentProps {}

type UserFormData = {
    name: string;
    password: string;
}

const CreateAccount = ({ history }: Props) => {
    const [formFields, setFormFields] = useState<UserFormData>({
        name: '',
        password: ''
    });

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields({
            ...formFields,
            name: event.target.value
        });
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields({
            ...formFields,
            password: event.target.value
        });
    };

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await makeNewUser(formFields);
        setFormFields({
            name: '',
            password: ''
        }); 
    };
    

    const makeNewUser = (newUserData: UserFormData) => {
        console.log(newUserData);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, newUserData)
            .then((response) => {
                console.log('success! New user created');
                console.log(response.data);
            })
            .catch((error) => {
                console.log('Oops! try again', error);
                console.log(error?.response?.data);
            });
    }; 

    // should probably display a success message! 

    return (
    <div>
        <header>
            <nav>
            <Link to="/SignIn">Sign in</Link>
            <Link to="/Multiplication">Multiplication</Link>
            <Link to="/Challenge">Send Challenge</Link>
            <Link to="/TradeCoins">Trade coins</Link>
            <Link to="CreateAccount" className='currentpage'>Create account</Link>
            <Link to='/'>Math Game</Link>
            </nav>
        </header>
        <div>
            <form onSubmit={onFormSubmit}>
                <div className='createUserForm'>
                    <label>Choose a User Name:</label>
                    <input 
                    name="name"
                    id="name"
                    value={formFields.name}
                    onChange={onNameChange}
                    required
                    />
                    <label>Choose a Password:</label>
                    <input 
                    name="password"
                    id="password"
                    value={formFields.password}
                    onChange={onPasswordChange}
                    required
                    />
                    <button type='submit' id='submit'>SUBMIT</button>
                </div>
            </form>
        </div>
    </div> 
    );
};

export default CreateAccount;
