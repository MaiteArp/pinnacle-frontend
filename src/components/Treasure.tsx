import React from "react";

type Props = {
    coins: number;
}

const Treasure: React.FC<Props> = ({coins}) => {
    return (
        <div>
            <h2>{coins} coins</h2>
        </div>
    );
};

export default Treasure;