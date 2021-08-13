import React, { useRef } from "react";
import { RouteComponentProps} from 'react-router'; 
import { Link } from 'react-router-dom';
import { ChallengeData, LoggedInUser } from '../Router';
import axios from 'axios';

//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps { 
    loggedInUser: LoggedInUser|null;
    inChallenge: ChallengeData|null;
    //outChallenge: ChallengeData|null;
    //setOutChallenge: React.Dispatch<React.SetStateAction<ChallengeData|null>>;
    checkChallenge: () => void;

}

type ChallengeFormData = {
    challenged: string;
    best_time: number;
}


const Challenge = ({ history, loggedInUser, inChallenge }: Props) => { // outChallenge, setOutChallenge

    const onChallengeSent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await sendNewChallenge({
            "challenged": String(challengedInput.current?.value),
            "best_time": Number(loggedInUser?.best_time)
        });
    };


    const challengedInput = useRef<HTMLInputElement>(null); 


    const sendNewChallenge = (newChallengeData: ChallengeFormData) => {
        if (loggedInUser !== null && loggedInUser.best_time !== null){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/challenges`, newChallengeData, 
            {
                params: {
                    format: 'json',
                }
            })
                .then((response) => {
                    console.log('success! New challenge sent');
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log('Oops! try again', error);
                    console.log(error?.response?.data);
                });
            } //setOutChallenge(newChallengeData)
        };
    
    //const acceptChallenge = () => {};
    // history.push('/');
    

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
            {/* might wat to make this display again only after winner has been sorted out */}
            <section>
                <h2>Please log in to your account to send a challenge</h2>
                <form onSubmit={onChallengeSent}>
                    <label>User to challenge:</label>
                    <input
                    name="challenged"
                    id="challenged"
                    ref={challengedInput}
                    
                    placeholder='destination username'
                    required
                    />  
                    <button type='submit'> Send </button>
                </form>
            </section>
            {/* {outChallenge !== null ? ( */} 
            <section>
                <p> You have challenged {} to beat your best time of { loggedInUser?.best_time } seconds who will be the winner?? </p>
            </section>
            {/*}): null} */}

            {inChallenge !== null ? ( <section>
            <h2>You have a new challenge from {} can you beat their best time of {}?</h2>
            <button>Accept</button> {/*on click this should take you to home and clear the 'youve been challenged'*/}
            <h2>You can forfeit by clicking "Decline"</h2>
            <button>Decline</button>
            </section>): null}
        </div>
    </div> 
    );
};

export default Challenge;