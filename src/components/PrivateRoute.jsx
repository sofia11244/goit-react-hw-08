import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <p>Loading...</p>;
  }

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;

};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.element,
  redirectTo: PropTypes.string.isRequired,
};
