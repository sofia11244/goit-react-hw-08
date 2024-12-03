import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations';

const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    dispatch(register(newUser));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;