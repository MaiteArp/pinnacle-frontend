import * as React from 'react';
import { RouteComponentProps } from 'react-router'; 
import NavBar from '../components/NavBar';

import SPACE from '../images/spacepic.jpg';
import CUTE from '../images/cute.jpg';
import BANDW from '../images/blackandwhite.jpg';
import DOGMOON from '../images/dogandmoon.jpg';
import UNICORNS from '../images/skatingunicorns.jpg';
import LAND from '../images/spacelandscape.jpg';
import DUCK from '../images/blueduck.jpg';
import BOOM from '../images/boompow.jpg';
import ELEPHANTS from '../images/elephants.jpg';


//import Title from '~/Components/Title'; // what would this be?

interface Props extends RouteComponentProps {
    setTheme: React.Dispatch<React.SetStateAction<string>>;

}

const TradeCoins = ({ setTheme }: Props) => {

    // const tradeCoins = () => {
        // if (coins > )
    // };


    return (
    <div>
        <NavBar />
        <main>
            <div className='choices'>
                <div className='nocoins'>
                    <div id='first'>
                    <img src={SPACE} alt="" id='space'/>
                    <p>0 coins</p>
                    <button onClick={() => setTheme('space')}>Trade coins</button>
                    </div>
                    <div>
                    <img src={CUTE} alt="cute" id='cute'/>
                    <p>0 coins</p>
                    <button onClick={() => setTheme('cute')}>Trade coins</button>
                    </div>
                    <div>
                    <img src={DOGMOON} alt="dogandthemoon" id='dogmoon' />
                    <p>0 coins</p>
                    <button onClick={() => setTheme('dogmoon')}>Trade coins</button>
                    </div>
                </div>


                <div className='thousanscoins'>
                    <div>
                    <img src={BANDW} alt="blackandwhite" id='bandw' />
                    <p>1000 coins</p>
                    <button onClick={() => setTheme('bandw')}>Trade coins</button>
                    </div>
                    <div>
                    <img src={UNICORNS} alt="skatingunicorns" id='unicorns' />
                    <p>1000 coins</p>
                    <button onClick={() => setTheme('unicorns')}>Trade coins</button>
                    </div>
                    <div>
                    <img src={LAND} alt="spacelandscape" id='land' />
                    <p>1000 coins</p>
                    <button onClick={() => setTheme('land')}>Trade coins</button>
                    </div>
                </div>

                <div className='tenthou'>
                    <div>
                    <img src={DUCK} alt="blueduck" id='duck' />
                    <p>10000 coins</p>
                    <button onClick={() => setTheme('duck')}>Trade coins</button>
                    </div>
                    <div>
                    <img src={BOOM} alt="boomboompow" id='boom' />
                    <p>10000 coins</p>
                    <button onClick={() => setTheme('boom')}>Trade coins</button>
                    </div>
                    <div>
                    <img src={ELEPHANTS} alt="fourelephants" id='elephants' />
                    <p>10000 coins</p>
                    <button onClick={() => setTheme('elephants')}>Trade coins</button>
                    </div>
                </div>
                

            </div>
        </main>
    </div> 
    );
};

export default TradeCoins;