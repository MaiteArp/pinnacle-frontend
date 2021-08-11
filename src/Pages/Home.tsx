import React, { KeyboardEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Question from "../components/Question"
import BestTime from "../components/BestTime" 
import Clock from "../components/Clock"
import Treasure from "../components/Treasure"
import { LoggedInUser } from '../Router';
import { RouteComponentProps } from 'react-router';



const QUESTION_TOTAL = 10;

interface Props extends RouteComponentProps { 
    loggedInUser: LoggedInUser|null, 
}

const Home = ({loggedInUser}: Props) => {
//{ history }: Props
    
    const [answer, setAnswer] = useState(0); // answer is the answer to the multiplication question ... 
    const [number, setNumber] = useState(0); // this is the current question
    const [coins, setCoins] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [multipleA, setMultipleA] = useState(0);// need one for each number so we can show it
    const [multipleB, setMultipleB] = useState(0);
    const [finalAnswer, setFinalAnswer] = useState(false);
    const [hasResponse, setHasResponse] = useState(false);
    const [bestTime, setBestTime] = useState<number|null>(null);

    const [count, setCount] = useState(0);
    const [userName, setUserName] = useState<string|null>(null);
    
    //const [treasure, setTreasure] = useState(0);
    //const 

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

    //useEffect bits?
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
            //TODO: store users best time in server
            if (loggedInUser !== null) { 
                axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/${loggedInUser.id}`, bestTime)
                .then( (response) => {
                    console.log('off to db');
                })
                .catch( (error) => {
                    console.log(error.response);

                });
            }
        }
    }; 

    // const collectTreasure = (coins: number) => {
    //     let treasure: number = coins
    // };

    useEffect (() => {
        if (loggedInUser !== null) { 
            setUserName(loggedInUser.name);
            setCoins(loggedInUser.coins);
            setBestTime(loggedInUser.best_time);
        }
    }, [loggedInUser]);


    return (
        <div className="App">
        
        <header>
            <div>
                <nav className='pages'>
                    <Link to='/SignIn'>Sign In</Link>
                    <Link to='/Multiplication'>Multiplication</Link>
                    <Link to='/Challenge'>Send Challenge</Link>
                    <Link to='/TradeCoins'>Trade coins</Link>
                    <Link to='/CreateAccount'>Create Account</Link>
                    <Link to='/' className='currentpage'>Math Game</Link>
                </nav>
            </div>
        </header>

        <main>
            <section className='top'>
            <div className='keeptime'>
                {/* a terniary to show the user's best time if there is a user */}
                {/* {loggedInUser !== null ? (<BestTime bestTime={user.bestTime}/>): null} */}
                {bestTime !== null ? ( <BestTime bestTime={bestTime}/> ): null}
            </div>
            {/* a terniary to show the user's 'name'Math Game if there is a user */}
            <h1> {userName !== null ? userName + "'s" : ""} Math Game</h1>
            </section>

            <section className='middle'>
                {gameOver ? (       
                <button className='begin' onClick={startGame}>
                    BEGIN
                </button>
                ) : null}

                <div className='prompt'>
                {!gameOver ? ( <Question multipleA={multipleA} multipleB={multipleB} finalAnswer={finalAnswer} hasResponse={hasResponse}/> ) : null}
                <input type="text" placeholder="enter a number" onKeyPress={handleSubmit} id='input'/>
                </div>

                {!gameOver ? <p className='coins'>
                You have collected {coins} coins!
                </p> : null}
            </section>

            <section className='bottom'>
                <Clock started={gameStarted} gameOver={gameOver} recordTime={recordGameTime} count={count} setCount={setCount} /> 
                {/* {loggedInUser !== null ? (<Treasure coins={user.coins}/>): null} */}
                <Treasure coins={coins}/> 
                {/* a terniary to show the user's coins if there is a user */}
            </section>
        </main>

        <footer className='footer'>
            <p id='trademark'>&copy; All rights reserved</p>
        </footer>

        </div>
    );
}

export default Home;