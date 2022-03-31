import React from 'react';
import { Outlet } from 'react-router-dom';

import './Auth.css';

function Auth({ setToken }) {
  return (
    <div className='auth-view'>
      <Outlet />
    </div>
  )
}

export default Auth;
