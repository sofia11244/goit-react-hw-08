import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations'; // register thunk'ını import ediyoruz

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.username.value, // Kullanıcı adını input'tan alıyoruz
      email: e.target.email.value,  // E-posta adresini input'tan alıyoruz
      password: e.target.password.value, // Şifreyi input'tan alıyoruz
    };

    // register thunk'ını dispatch ediyoruz
    dispatch(register(newUser));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
