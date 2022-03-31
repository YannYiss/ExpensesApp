import React from 'react';
import { Trash2 } from 'react-feather';
import './Expense.css';

function Expense({ description, amount, onDelete }) {
  return (
    <div className="expense">
      <div className="expense__text">
        <h3>{description}</h3>
        <p>{`$${amount}`}</p>
      </div>
      <div onClick={onDelete} className="expense_delete">
        <Trash2 />
      </div>
    </div> 
  )
}

export default Expense;
