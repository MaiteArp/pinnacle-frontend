import * as React from 'react';
import { RouteComponentProps } from 'react-router'; 
import NavBar from '../components/NavBar';
import * as pic from '../images/multiplication-chart-1-12.jpg';


interface Props extends RouteComponentProps {}

const Multiplication = ({ history }: Props) => {
    const chart = pic.default;
    const showChart = ()=> {
        return <img src={chart} alt="multiplication tables" id='tables'/>
    };
    
    return (
    <div>
        <NavBar />
        
        <main>
            { showChart() }
        </main>
    </div> 
    );
};

export default Multiplication;