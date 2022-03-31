import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpenses, createExpense, deleteExpense } from '../../api';
import './ExpensesList.css';
import Button from '../../components/Button';
import Expense from '../../components/Expense';
import TextInput from '../../components/TextInput/TextInput';

function ExpensesList({ token }) { // 
  const [expenseDescription, setExpenseDescription] = useState("")
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenses, setExpenses] = useState([])
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  useEffect(() => {
    setLoader(true);
    getExpenses(token)
      .then((res) => {
        setExpenses(res.data)
        setLoader(false);
      })
      .catch((err) => {
        console.error(err)
      })
  }, []);

  const addExpense = () => {
    createExpense(expenseDescription, expenseAmount, token)
    .then((res) => {
      const createdExpense = res.data;
      setExpenses(expenses.concat(createdExpense))
      setExpenseDescription('')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const onDeleteExpense = (id) => {
    deleteExpense(id, token)
    .then((res) => {
      console.log(res.data)
      setExpenses(expenses.filter((e) => e._id !== id))
    })
    .catch((error) => {
      console.error(error)
    })
  } 

  return (
    <div className='expense-list'>
      <h2 style={{ color: 'white' }}>Bienvenidx</h2>
      <div className="expense-input__container">
        <TextInput 
          value={expenseDescription} 
          placeholder="Describe your expense"
          type="text"
          onChange={(e) => setExpenseDescription(e.target.value)}   
        />
        <TextInput 
          value={expenseAmount} 
          placeholder="Type in the amount expended"
          type="number"
          onChange={(e) => setExpenseAmount(e.target.value)}   
        />
        <Button 
          className="expense-input__btn" 
          onClick={addExpense}
        >Register expense</Button>
      </div>
      {loader && (<p style={{ color: 'white' }}>Loading...</p>)}
      {expenses.map((expense) => (
        <Expense key={expense._id} description={expense.description} amount={expense.amount} onDelete={() => onDeleteExpense(expense._id)} />
      )).reverse()}
    </div>
  )
}

export default ExpensesList;
