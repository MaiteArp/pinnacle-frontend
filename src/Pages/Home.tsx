import React, { KeyboardEvent, useState, useEffect } from 'react';
import axios from 'axios';
import Question from "../components/Question"
import BestTime from "../components/BestTime" 
import Clock from "../components/Clock"
import Treasure from "../components/Treasure"
import { ChallengeData, LoggedInUser } from '../Router';
import { RouteComponentProps } from 'react-router';
import NavBar from '../components/NavBar';


const QUESTION_TOTAL = 10;

interface Props extends RouteComponentProps { 
    loggedInUser: LoggedInUser|null; 
    setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUser|null>>;
    coins: number;
    setCoins: React.Dispatch<React.SetStateAction<number>>;
    checkChallenge: () => void;
    inChallenge: ChallengeData|null;
    setInChallenge: React.Dispatch<React.SetStateAction<ChallengeData|null>>;
    activeChallenge: ChallengeData|null;
    setActiveChallenge: React.Dispatch<React.SetStateAction<ChallengeData|null>>;
    outChallenge: ChallengeData|null;
    setOutChallenge: React.Dispatch<React.SetStateAction<ChallengeData|null>>;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({loggedInUser, setLoggedInUser, coins, setCoins, checkChallenge, inChallenge, setInChallenge, setOutChallenge, activeChallenge, setActiveChallenge, setTheme }: Props) => {
//{ history }: Props
    
    const [answer, setAnswer] = useState(0); // answer is the answer to the multiplication question ... 
    const [number, setNumber] = useState(0); // this is the current question
    
    const [gameOver, setGameOver] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [multipleA, setMultipleA] = useState(0);// need one for each number so we can show it
    const [multipleB, setMultipleB] = useState(0);
    const [finalAnswer, setFinalAnswer] = useState(false);
    const [hasResponse, setHasResponse] = useState(false);
    const [bestTime, setBestTime] = useState<number|null>(null);

    const [count, setCount] = useState(0);
    const [userName, setUserName] = useState<string|null>(null);

    const [winnerName, setWinnerName] = useState<string|null>(null);


    const startGame = () => {
        
        setGameStarted(true);
        setGameOver(false);
        newQuestion();
        setNumber(0);
        setCount(0);
        setHasResponse(false);
        document.getElementById('input')?.focus(); // '?.' syntatic sugar to check for null before dereferencing
    };

    //function to randomize numbers and multiply them
    const newQuestion = () => {
        let multipleA: number = Math.floor(Math.random() * (12 + 1));//random integer from 0 to 12
        let multipleB: number = Math.floor(Math.random() * (12 + 1));// random integer from 0 to 12
        let correctAnswer = multipleA * multipleB
        console.log('this is the correct answer', correctAnswer); 
        setMultipleA(multipleA);
        setMultipleB(multipleB);
        setAnswer(correctAnswer); // I was missing this part that overrides the intial value 
    }; 

    
    const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
            console.log('we are submitting something');
            let data = e.currentTarget.value;
            checkAnswer(Number(data));
            let hasResponse = true;
            setHasResponse(hasResponse);
            console.log('the number I typed' , e.currentTarget.value);
            e.currentTarget.value = ""; //makes input re-set to '??'
        } 
    };

    const checkAnswer = (userAnswer: number) => {
        //answer comes from state 
        let finalAnswer = false;
        if (answer === userAnswer) {
            finalAnswer = true;
            setCoins(coins + 10); //updates coins
            nextQuestion(); // adds one to the set of ten questions
            newQuestion(); // calls function to make a new question
        }
        setFinalAnswer(finalAnswer); 
    }; 

    const nextQuestion = () => {
        const laterQuestion = number + 1; // name change
        if (laterQuestion === QUESTION_TOTAL) {
            setGameOver(true);
        } else {
            setNumber(laterQuestion);
        }
    };

    const recordGameTime = (seconds: number) => {
        if (bestTime === null || seconds < bestTime) {
            setBestTime(seconds);
            
            if (loggedInUser !== null) { 
                axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/${loggedInUser.id}`, { "best_time": seconds } )
                .then( (response) => {
                    console.log('off to db');
                })
                .catch( (error) => {
                    console.log(error.response);
                });
            }
        } 
        if (activeChallenge !== null) {
            decideWinner();
        }
        collectTreasure();
    };   

    const collectTreasure = () => { 
        if (loggedInUser !== null && coins > 0) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/${loggedInUser.id}/deposit`, { "amount": coins } )
            .then( (response) => {
                console.log('off to db');
                setCoins(0);
                setLoggedInUser(response.data.user);
            })
            .catch( (error) => {
                console.log(error.response);
            });
        } 
    };

    useEffect (() => {
        if (loggedInUser !== null) { 
            collectTreasure();
            checkChallenge();
            setUserName(loggedInUser.name);
            setBestTime(loggedInUser.best_time);
            setTheme(loggedInUser.theme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser]);

    const decideWinner = () => {
        if (loggedInUser !== null && inChallenge !== null) {
            if (count !== 0 && count < inChallenge.sent_time) { 
                inChallenge.winner = loggedInUser.id 
            } 
            else { 
                inChallenge.winner = inChallenge.challenger_id
            } axios.patch(`${process.env.REACT_APP_BACKEND_URL}/challenges/${inChallenge.id}`, {"winner": inChallenge.winner} )
            .then( (response) => {
                console.log('winner winner chicken dinner')
                let challenge: ChallengeData = response.data?.challenge;
                setActiveChallenge(challenge);

            })
            .catch( (error) => {
                console.log(error.response);
            });
        } 
    };

    //to display winner
    useEffect( () => {
        if (loggedInUser !== null && activeChallenge !== null) {
            if (activeChallenge.winner == null) {
                return;
            }
            if (loggedInUser.id === activeChallenge.winner) {
                setWinnerName(loggedInUser.name);
            } else {
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${activeChallenge.winner}`) // here
                .then( (response) => {
                    console.log('the winner');
                    setWinnerName(response.data.name);
                })
                .catch( (error) => {
                    console.log(error.response);
                });
            } 
        }
    }, [setWinnerName, activeChallenge, loggedInUser]) 

    const resetChallengeStuff = () => {
        setInChallenge(null);
        setActiveChallenge(null);
        setOutChallenge(null);
        setWinnerName(null);
    };


    return (
        <div className="App">
            <NavBar />

        <main>
            <section className='top'>
            <div className='keeptime'>
                {bestTime !== null ? ( <BestTime bestTime={bestTime}/> ): null}
            </div>
            {/* a terniary to show the user's 'name'Math Game if there is a user */}
            <h1> {userName !== null ? userName + "'s" : ""} Math Game</h1>
            {inChallenge ? ( <h2> You've been challenged </h2>): null} 
            </section>
            
            {winnerName !== null ? (<section> 
                <h2> The winner is {winnerName} </h2> 
                <button onClick={resetChallengeStuff} id='done'>Done</button>
                </section>): null}
            

            <section className='middle'>
                {gameOver ? (       
                <button className='begin' onClick={startGame}>
                    BEGIN
                </button>
                ) : null}

                <div className='prompt'>
                {!gameOver ? ( <Question multipleA={multipleA} multipleB={multipleB} finalAnswer={finalAnswer} hasResponse={hasResponse}/> ) : null}
                <input type="text" placeholder="enter a number" onKeyPress={handleSubmit} id='input' autoComplete='off'/>
                </div>

                {!gameOver ? <p className='coins'>
                You have collected {coins} coins!
                </p> : null}
            </section>

            <section className='bottom'>
                <Clock started={gameStarted} gameOver={gameOver} recordTime={recordGameTime} count={count} setCount={setCount} /> 
                
                <Treasure coins={(loggedInUser?.coins ?? 0) + coins}/> 
                {/* a terniary? to show the user's coins if there is a user */}
            </section>
        </main>

        <footer className='footer'>
            <p id='trademark'>&copy; All rights reserved</p>
        </footer>

        </div>
    );
}

export default Home;