import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import { selectIsLoggedIn } from '../redux/auth/selectors';


const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <h1>Phonebook</h1>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : 
      
      <nav>
  </nav>}
    </header>
  );
};

export default AppBar;
