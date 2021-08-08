import React from "react";
type Props = {
    bestTime: number|null;
}

const BestTime: React.FC<Props> = ({ bestTime }) => {
    return (
        <h2 id='besttime'> Best time {bestTime} sec</h2>
    );
};

export default BestTime;