import React from "react";

type Props = {
    question: any;
    answer: any;//might be number might be string
    //callback: any;
    userAnswer: number;
    questionsNumber: number;
    totalQuestions: number;
    multipleA: number;
    multipleB: number;
}

const Question: React.FC<Props> = ({question, answer, userAnswer, questionsNumber, totalQuestions, multipleA, multipleB, }) => {
    return (
        <div>
            <h2 className='question'>
                What is {multipleA} x {multipleB} ?
            </h2>
            <h3>{"Correct or incorrect answer"}</h3>
        </div>
    )
}
    

export default Question;

