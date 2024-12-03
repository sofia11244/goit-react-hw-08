import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Link } from 'react-router-dom';


const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <h1>Phonebook</h1>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : 
      
      <nav>
        <Link to="/register">Register</Link>
        <br></br>
        <Link to="/login">Login</Link>
      </nav>}
    </header>
  );
};

export default AppBar;
