import { NavLink } from 'react-router-dom';



const NavBar = () => {


    return (
        <header>
            <div>
                <nav className='pages'>
                    <NavLink activeClassName='currentpage' to='/SignIn'>Sign In</NavLink>
                    <NavLink activeClassName='currentpage' to='/Multiplication'>Multiplication</NavLink>
                    <NavLink activeClassName='currentpage' to='/Challenge'>Challenges</NavLink>
                    <NavLink activeClassName='currentpage' to='/TradeCoins'>Trade coins</NavLink>
                    <NavLink activeClassName='currentpage' to='/CreateAccount'>Create Account</NavLink>
                    <NavLink exact activeClassName='currentpage' to='/'>Math Game</NavLink>
                </nav>
            </div>
        </header>
    );
}; 

export default NavBar;