import './App.css';
import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ExpensesList from './views/ExpensesList';
import Auth from './views/Auth';

function App() {
  let [token, setToken] = useState(null);

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={<ExpensesList token={token}/>}/>
          <Route path='auth' element={<Auth setToken={setToken}/>}>
            <Route index element={<Login setToken={setToken} />} />
              <Route path="login" element={<Login setToken={setToken}/>} />
              <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
