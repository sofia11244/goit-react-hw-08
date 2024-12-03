import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';

const AuthNav = () => (
  <nav>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
  </nav>
);

export default AuthNav;