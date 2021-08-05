import React, { useState, useRef, useEffect } from "react";

type Props = {
    gameOver: boolean;
    started: boolean;
    recordTime: (arg: number) => void
}


const Clock: React.FC<Props> = ({ started, gameOver, recordTime }) => {
    const [count, setCount] = useState(0);
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(()=> {
        if (started === true && gameOver === false) {
            timerRef.current = setInterval(() => {
                setCount(c => c + 1);
            }, 1000);
            
            return () => {
                clearInterval(timerRef.current!);
            };
        } else if (started === true && gameOver === true) {
            recordTime(count);
        }
    }, [ timerRef, started, gameOver, setCount, recordTime ]);

    return (
        <div id='clock'>
            { count < 10 ? `0${count}`: count } sec
        </div>
    );
};

export default Clock;