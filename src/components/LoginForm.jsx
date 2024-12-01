import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/operations'; // login thunk'ını import ediyoruz

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: 'john.doe@example.com', // Örnek e-posta
      password: 'password123', // Örnek şifre
    };

    // login thunk'ını dispatch ediyoruz
    dispatch(login(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
