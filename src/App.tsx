import React, { KeyboardEvent, useState } from 'react';

import BestTime from "./components/BestTime" 
import Question from "./components/Question"
import Treasure from "./components/Treasure"
import Clock from "./components/Clock"
import './App.css';

//Router things

import * as ReactDOM from 'react-dom';
import Router from './Router';

interface Props {}
const App = ({}:Props)=> {
  return <Router />;
};
ReactDOM.render(<App />, document.getElementById('root'));
// end of routing stuff 

// const QUESTION_TOTAL = 10;


// function App() {
//   const startGame = () => {
//     setLoading(true);
//     setGameOver(false);
//     newQuestion();
//   };

//   const newQuestion = () => {
//     let multipleA = Math.floor(Math.random() * (12 + 1));//random integer from 0 to 12
//     let multipleB = Math.floor(Math.random() * (12 + 1));// random integer from 0 to 12
//     let correctAnswer = multipleA * multipleB
//     console.log('this is the correct answer', correctAnswer); 
//     setAnswer(correctAnswer) // I was missing this part that overrides the intial value 
//   };//function to randomize numbers and multiply them 


//   const [loading, setLoading] = useState(false);// not sure I need this ...
//   const [answer, setAnswer] = useState(0); // answer is the answer to the multiplication question ... 
//   const [number, setNumber] = useState(0);
//   const [userAnswer, setUserAnswers] = useState(0);
//   const [coins, setCoins] = useState(0);
//   const [gameOver, setGameOver] = useState(true);
//   const [multipleA, setMultipleA] = useState();// need one for each number so we can show it
//   const [multipleB, setMultipleB] = useState();

  
//   //useEffect bits?
//   const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
//     //console.log('answer', answer)
//     if (e.code === "Enter" || e.code === "NumpadEnter") {
//       e.preventDefault();
//       console.log('we are submitting something');
//       let data = e.currentTarget.value;
//       checkAnswer(Number(data));
//       console.log('the number I typed' , e.currentTarget.value);
//       e.currentTarget.value = ""; //input re-sets to '??'
//     } 
//   };

//   const checkAnswer = (userAnswer: number) => {
//     //answer comes from state 
//     if (answer === userAnswer) {
//       console.log("yay! correct answer"); 
//       setUserAnswers(userAnswer + 1);
//       setCoins(coins + 10); //updates coins
//       nextQuestion(); // adds one to the set of ten questions
//       newQuestion(); // call func to make a new question
//     } else {
//       console.log("try again");
//       setUserAnswers(userAnswer + 1);
//     }
//     console.log('answer', answer, 'and user answer', userAnswer)
//   }; //if input equals answer. Great!-(QUESTION_TOTAL);
  

//   const nextQuestion = () => {
//     const laterQuestion = number + 1; // name change
//     if (laterQuestion === QUESTION_TOTAL) {
//       setGameOver(true);
//     } else {
//       setNumber(laterQuestion);
//     }
//   };


//   return (
//     <div className="App">
      
//       <header>
//         <div>
//           <div>
//             Times somewhere around here
//           </div>

//           <nav>
//             <button> Sign in </button>
//             <button to={'./Pages/Multiplication'}>"Multiplication"</button>
//             <button>Send a challenge</button>
//             <button>Trade your coins</button>
//             <button>Create an account</button>
//           </nav>
//         </div>
//       </header>

//       <main>
//         <h1> Math Game</h1>
//         {gameOver || userAnswer === QUESTION_TOTAL ? (       
//           <button className='begin' onClick={startGame}>
//             Begin
//           </button>
//           ) : null}
        
//           <section>
//             'What is the answer to: '
//             <input type="text" placeholder="??" onKeyPress={handleSubmit}/>
//           </section>

//           {!gameOver ? <p className='coins'>
//           You have collected {coins} coins!
//           </p> : null}
//       </main>

//       <footer>
//         <div>
//           Treasure Chest and coins 
//         </div>
//         <div>
//           <Clock /> 
//         </div>
//       </footer>

//     </div>
//   );
// }

export default App;
