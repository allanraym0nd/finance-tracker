import React, { useState } from 'react';
import { Trash2, DollarSign, Plus } from 'lucide-react';

export default function ExpenseTracker() {
  // State to store all expenses
  const [expenses, setExpenses] = useState([]);
  
  // State for the form inputs
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');

  // Function to add a new expense
  const addExpense = () => {
    
    // Validate inputs
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid description and amount');
      return;
    }

    // Create new expense object
    const newExpense = {
      id: Date.now(), // Simple ID generation
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    // Add to expenses array
    setExpenses([...expenses, newExpense]);
    
    // Clear form
    setDescription('');
    setAmount('');
    setCategory('food');
  };

  // Function to delete an expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <DollarSign className="text-green-600" />
          Expense Tracker
        </h1>
        <p className="text-gray-600 mt-2">Track your daily expenses</p>
      </div>

      {/* Add Expense Form */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you spend on?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          onClick={addExpense}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      {/* Total Display */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Expenses List */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800 mb-3">Recent Expenses</h3>
        
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No expenses yet. Add one above!
          </p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{expense.description}</p>
                <p className="text-sm text-gray-600">
                  {expense.category} • {expense.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-red-600">
                  ${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}