import { Link } from 'react-router-dom';

const AuthNav = () => (
  <nav>
    <Link to="/register">Register</Link>
    <br></br>
    <Link to="/login">Login</Link>
  </nav>
);

export default AuthNav;