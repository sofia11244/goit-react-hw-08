import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations';
import style from '../components/ComponentsStyles/RegistrationForm.module.css'

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
  // className={style.form}

  return (<div>
<form onSubmit={handleSubmit} className={style.form}>
      <input className={style.forminput} type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className={style.forminput} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={style.forminput} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className={style.formbutton} type="submit">Register</button>
    </form>

  </div>
    
  );
};

export default Registration;