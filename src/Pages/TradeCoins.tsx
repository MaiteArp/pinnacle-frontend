import * as React from 'react';
import { RouteComponentProps } from 'react-router'; 
import NavBar from '../components/NavBar';

//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {}

const TradeCoins = ({ history }: Props) => {
    return (
    <div>
        <NavBar />

        <div>
            This should display a few pictures with toggle buttons underneath and coins necessary next to them
        </div>
    </div> 
    );
};

export default TradeCoins;