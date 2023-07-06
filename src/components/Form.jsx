import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../features/transactions/transactionsSlice';
const Form = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transactions);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter title"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              id="income"
              value="income"
              name="type"
              checked={type === 'income'}
              required
              onChange={() => setType('income')}
            />
            <label htmlFor="income">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              id="expense"
              placeholder="Expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            <label htmlFor="expense">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            name="amout"
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn" disabled={isLoading}>
          Add Transaction
        </button>
        {!isLoading && isError && (
          <p className="error">Something went wrong!</p>
        )}

        <button className="btn cancel_edit">Cancel Edit</button>
      </form>
    </div>
  );
};

export default Form;
