//Este archivo va a contener todas las operaciones logicas que cada enpoint va a realizar

const asyncHandler = require('express-async-handler'); //Esta libreria nos permitira manejar de mejor manera las promesas y se tiene que envolver la funcion asincrona en ella 

const Expense = require('../models/expenseModel'); //En esta linea vamos a importar el modelo de datos que utilizara este endpoint

const getExpenses = asyncHandler(async(req,res) => {
    const expenses = await Expense.find({user: req.user.id});
    res.status(200).json(expenses);
});

const createExpense = asyncHandler(async(req,res) => {
    const expense = await Expense.create({
        user: req.user.id,
        description: req.body.description,
        amount: req.body.amount
    });
    res.status(200).json(expense);
});

const deleteExpense = asyncHandler(async(req,res) => {
    const expense = await Expense.findById(req.params.id);

    if(!expense) {
        res.status(400);
        throw new Error('Expense not found');
    };

    if(expense.user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('You are not authorized to delete this expense');
    };

    await expense.remove();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getExpenses,
    createExpense,
    deleteExpense
};