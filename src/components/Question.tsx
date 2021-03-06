import React from "react";

type Props = {
    finalAnswer: boolean;
    multipleA: number;
    multipleB: number;
    hasResponse: boolean;
}

const Question: React.FC<Props> = ({ finalAnswer, multipleA, multipleB, hasResponse }) => {
    const displayAnswer = () => {
        let display:string = "" //does this need to be state?
        if (finalAnswer === true) {
            display = "YAY!! Correct!! next..."
        } else {
            display = "Sorry! Try again!"
        } return display;
    } // and display after we push the begin button

    return (
        <div>
            { hasResponse? ( <h3 className='display'> {displayAnswer()} </h3>): null}
            <h2 className='question'>
                What is {multipleA} x {multipleB} ?
            </h2>
            {/* { hasResponse? ( <h3 className='display'> {displayAnswer()} </h3>): null}  */}
        </div>
    );
};
    

export default Question;

