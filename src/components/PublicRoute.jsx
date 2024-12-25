import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export const PublicRoute = ({ children, restricted = false }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log('isLoggedIn:', isLoggedIn);
  console.log('restricted:', restricted);
  // Eğer kullanıcı giriş yapmışsa ve restricted true ise, yönlendirme yapılır.
  if (isLoggedIn && restricted) {
    console.log('Redirecting to "/"');
    return <Navigate to="/" />;
  }

  // Aksi takdirde children bileşeni render edilir.
  return children;
};


PublicRoute.propTypes = {
  restricted: PropTypes.bool,
  children: PropTypes.node.isRequired, // children element için "node" kullanılır.
};

export default PublicRoute;
