import React, { useRef, useState, useEffect } from "react";
import { RouteComponentProps} from 'react-router'; 
import { Link } from 'react-router-dom';
import { ChallengeData, LoggedInUser } from '../Router';
import axios from 'axios';



interface Props extends RouteComponentProps { 
    loggedInUser: LoggedInUser|null;
    inChallenge: ChallengeData|null;
    outChallenge: ChallengeData|null;
    activeChallenge: ChallengeData|null;
    setActiveChallenge: React.Dispatch<React.SetStateAction<ChallengeData|null>>;
    setOutChallenge: React.Dispatch<React.SetStateAction<ChallengeData|null>>;
    setInChallenge: React.Dispatch<React.SetStateAction<ChallengeData|null>>;
    checkChallenge: () => void;
}

type ChallengeFormData = {
    challenged: string;
    best_time: number;
}


const Challenge = ({ history, loggedInUser, inChallenge, outChallenge, setOutChallenge, setActiveChallenge, setInChallenge }: Props) => { 
    const [challengedName, setChallengedName] = useState<string|null>(null);
    const [challengerName, setChallengerName] = useState<string|null>(null);
    
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
                    setChallengedName(newChallengeData.challenged)
                    setOutChallenge(response.data) //this 
                })
                .catch((error) => {
                    console.log('Oops! try again', error);
                    console.log(error?.response?.data);
                });
            } 
        };

    //to display the challenger
    useEffect(() => {
        if (inChallenge !== null){
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${inChallenge.challenger_id}`)
            .then( (response) => {
                console.log('the challenger')
                setChallengerName(response.data.name);
                
            })
            .catch( (error) => {
                console.log(error.response);
            });
        }
    }, [inChallenge, setChallengerName])


    const acceptChallenge = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveChallenge(inChallenge);
        setInChallenge(null);
        history.push('/');
    };
    
    const declineChallenge = (event: React.MouseEvent<HTMLButtonElement>) => {
        //stuff here
        let challenge = inChallenge;
        if (challenge !== null) {
            challenge.winner = Number(challenge?.challenger_id);
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/challenges/${challenge.id}`, {"winner": challenge.winner} )
            .then( (response) => {
                console.log('we forfeited')
                setActiveChallenge(challenge);
                setInChallenge(null);
            })
            .catch( (error) => {
                console.log(error.response);
            });
        }
        history.push('/');
    };
    // send back inChallengeData  


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
                {loggedInUser ? null : ( <h2>Please log in to your account to send a challenge.</h2>)}
                <form onSubmit={onChallengeSent} className='challengeForm'>
                    <label>User to challenge:</label>
                    <input
                    name="challenged"
                    id="challenged"
                    ref={challengedInput}
                    placeholder='destination username'
                    required
                    />  
                    <button type='submit' id='challengeForm'> Send </button>
                </form>
            </section>

            {outChallenge !== null ? ( <section className='outchallenge'> 
                <p> You have challenged {challengedName} to beat your best time of { loggedInUser?.best_time } seconds who will be the winner?? </p>
            </section>): null}

            {inChallenge != null ? ( <section className='inchallenge'>
            <h2>You have a new challenge from {challengerName} can you beat their best time of {inChallenge.sent_time} seconds?</h2>
            <h3>You can forfeit by clicking "Decline"</h3>
            <div className='respond'>
                <button onClick={acceptChallenge} id='accept'>Accept</button>
                <button onClick={declineChallenge} id='decline'>Decline</button>
            </div>
            </section>): null}
        </div>
    </div> 
    );
};

export default Challenge;