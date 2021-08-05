import React, { KeyboardEvent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router'; 
import { Link } from 'react-router-dom';

import Question from "../components/Question"
import BestTime from "../components/BestTime" 
import Clock from "../components/Clock"
import Treasure from "../components/Treasure"


interface Props extends RouteComponentProps {}

const QUESTION_TOTAL = 10;


const Home = ({ history }: Props) => {

    const [loading, setLoading] = useState(false);// not sure I need this ...
    const [answer, setAnswer] = useState(0); // answer is the answer to the multiplication question ... 
    const [number, setNumber] = useState(0);
    const [userAnswer, setUserAnswers] = useState(0);
    const [coins, setCoins] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [multipleA, setMultipleA] = useState(0);// need one for each number so we can show it
    const [multipleB, setMultipleB] = useState(0);
    const [finalAnswer, setFinalAnswer] = useState(false);
    const [hasResponse, setHasResponse] = useState(false);
    const [bestTime, setBestTime] = useState<number|null>(null);

    const startGame = () => {
        setLoading(true);
        setGameStarted(true);
        setGameOver(false);
        newQuestion();
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
            setUserAnswers(userAnswer + 1);
            setCoins(coins + 10); //updates coins
            nextQuestion(); // adds one to the set of ten questions
            newQuestion(); // calls function to make a new question
        } else {
            setUserAnswers(userAnswer + 1);
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
        }
    }

    return (
        <div className="App">
        
        <header>
            <div>
                <div>
                    {gameOver && bestTime !== null ? ( <BestTime bestTime={bestTime}/> ): null}
                </div>

                <nav className='pages'>
                    <Link to='/SignIn'>Sign In</Link>
                    <Link to='/Multiplication'>Multiplication</Link>
                    <Link to='/Challenge'>Send Challenge</Link>
                    <Link to='/TradeCoins'>Trade coins</Link>
                    <Link to='/CreateAccount'>Create Account</Link>
                    <Link to='/'>Math Game</Link>
                </nav>
            </div>
        </header>

        <main>
            <h1> Math Game</h1>
            {gameOver || userAnswer === QUESTION_TOTAL ? (       
            <button className='begin' onClick={startGame}>
                Begin
            </button>
            ) : null}
            
            <section>
                {!gameOver ? ( <Question multipleA={multipleA} multipleB={multipleB} finalAnswer={finalAnswer} hasResponse={hasResponse}/> ) : null}
                <input type="text" placeholder="??" onKeyPress={handleSubmit}/>
            </section>

            {!gameOver ? <p className='coins'>
            You have collected {coins} coins!
            </p> : null}
        </main>

        <footer>
            <div>
            Treasure Chest and coins 
            </div>
            <div>
            <Clock started={gameStarted} gameOver={gameOver} recordTime={recordGameTime}/> 
            </div>
        </footer>

        </div>
    );
}

export default Home;