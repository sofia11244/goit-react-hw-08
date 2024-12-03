import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import PropTypes from 'prop-types';
const RestrictedRoute = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (typeof redirectTo !== 'string') {
    throw new Error('"redirectTo" prop must be a string.');
  }

  return !isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};

export default RestrictedRoute;

RestrictedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

// Bu kod, RestrictedRoute bileşenini tanımlar. 
// Bu bileşen, kullanıcı giriş yapmışsa (isLoggedIn true ise), kullanıcıyı belirtilen yöne (redirectTo) yönlendirir. 
// Kullanıcı giriş yapmamışsa (isLoggedIn false ise), belirtilen bileşeni (Component) render eder.