import React from "react";
type Props = {
    bestTime: number|null;
}

const BestTime: React.FC<Props> = ({ bestTime }) => {
    return (
        <div>
            <h2> Best time {bestTime} </h2>
        </div>
    );
};

export default BestTime;