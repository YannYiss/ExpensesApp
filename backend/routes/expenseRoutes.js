//Este archivo va a contener todas las rutas y sus tipos de request, se crea una por cada endpoint
const express = require('express');
const router = express.Router();
const {getExpenses, createExpense, deleteExpense} = require('../controllers/expenseController');
const {protect} = require('../middlewares/authMiddleware');

router.route('/').get(protect, getExpenses).post(protect, createExpense);

router.route('/:id').delete(protect, deleteExpense);

module.exports = router