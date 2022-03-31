import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

import { signUp } from '../../api';

function SignUp({ setToken }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const makeSignUp = () => {
    signUp({ name, email, password })
    .then((res) => {
      const user = res.data;
      navigate('/auth/login');
    })
    .catch((err) => {
      console.error(err);
    })
  }
  
  return (
    <div>
      <h2>Sign up</h2>
      <div className='auth-view__input-container'>
        <TextInput 
          value={name} 
          type="text" 
          placeholder="Type in your name" 
          onChange={(e) => setName(e.target.value)}
        />
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
      <Button onClick={makeSignUp}>Sign Up</Button>
      <Link to="/auth/login">Already have an account? Sign-in here</Link>
    </div>
  )
}

export default SignUp;
