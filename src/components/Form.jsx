import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTransaction,
  createTransaction,
  editModeInactive,
} from '../features/transactions/transactionsSlice';
const Form = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transactions);
  const { editing } = useSelector((state) => state.transactions);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  // console.log(editing);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    resetForm();
  };

  const editFormHandler = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id: editing?.id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    cancelEditMode();
  };

  const resetForm = () => {
    setName('');
    setAmount('');
    setType('');
  };

  const cancelEditMode = () => {
    dispatch(editModeInactive());
    setEditMode(false);
    resetForm();
  };

  useEffect(() => {
    if (editing?.id) {
      setEditMode(true);
      setName(editing?.name);
      setAmount(editing?.amount);
      setType(editing?.type);
    } else {
      setEditMode(false);
    }
  }, [editing]);

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? editFormHandler : submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter title"
            value={name}
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
            placeholder="enter amount"
            name="amout"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn" disabled={isLoading}>
          {editMode ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {!isLoading && isError && (
          <p className="error">Something went wrong!</p>
        )}
        {editMode && (
          <button className="btn cancel_edit" onClick={cancelEditMode}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
