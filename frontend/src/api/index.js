import axios from 'axios';

export const login = (email, password) => {
  return axios.post('http://localhost:3000/users/login', {
    email,
    password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const signUp = ({ name, email, password }) => {
  return axios.post('http://localhost:3000/users', {
    name,
    email,
    password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getExpenses = (token) => {
  return axios.get('http://localhost:3000/expenses', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const createExpense = (description, amount, token) => {
  return axios.post('http://localhost:3000/expenses', { description, amount }, 
  {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const deleteExpense = (id, token) => {
  return axios.delete(`http://localhost:3000/expenses/${id}`, 
  {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}