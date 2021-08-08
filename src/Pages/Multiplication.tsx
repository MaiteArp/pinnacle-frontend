import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router'; 
import { Link } from 'react-router-dom';
import * as pic from '../images/multiplication-chart-1-12.jpg';


interface Props extends RouteComponentProps {}

const Multiplication = ({ history }: Props) => {
    const chart = pic.default;
    const showChart = ()=> {
        return <img src={chart} alt="multiplication tables" id='tables'/>
    };
    
    return (
    <div>
        <header>
            <nav>
            <Link to="/SignIn">Sign in</Link>
            <Link to="Multiplication" className='currentpage'>Multiplication</Link>
            <Link to="/Challenge">Send Challenge</Link>
            <Link to="/TradeCoins">Trade coins</Link>
            <Link to="/CreateAccount">Create account</Link>
            <Link to='/'>Math Game</Link>
            </nav>
        </header>
        <main>
            { showChart() }
        </main>
    </div> //I want this to be buttons?

    );
};

export default Multiplication;