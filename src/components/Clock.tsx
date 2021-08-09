import React, { useRef, useEffect } from "react";

type Props = {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;

    gameOver: boolean;
    started: boolean;
    recordTime: (arg: number) => void;
}


const Clock: React.FC<Props> = ({ started, gameOver, recordTime, count, setCount }) => {
    // const [count, setCount] = useState(0);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ timerRef, started, gameOver, setCount, recordTime ]);

    return (
        <div>
            <h2 id='clock'> { count < 10 ? `0${count}`: count } sec </h2>
        </div>
    );
};

export default Clock;