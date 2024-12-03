import {  Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import PropTypes from 'prop-types';

const PublicRoute = ({ children, restricted }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn && restricted ? <Navigate to="/" /> : children;
};

export default PublicRoute;

PublicRoute.propTypes = {
  restricted: PropTypes.bool,
  children: PropTypes.element,
};
