import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import { login } from '../../api';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const makeLogin = () => {
    login(email, password)
    .then((res) => {
      const user = res.data;
      setToken(user.token);
      navigate('/');
    }) 
    .catch((err) => {
      console.error(err);
    })
  }
  
  return (
    <div>
      <h2>Login</h2>
      <div className='auth-view__input-container'>
        <TextInput 
          value={email} 
          type="email" 
          placeholder="Type in your email" 
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput 
          value={password} 
          type="password" 
          placeholder="Type in your password" 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={makeLogin}>Login</Button>
      <Link to="/auth/signup">Don't have an account yet? Sign-in here</Link>
    </div>
  )
}

export default Login;
