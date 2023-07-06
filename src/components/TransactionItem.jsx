import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import deleteIcon from '../assets/images/delete.svg';
import editIcon from '../assets/images/edit.svg';
import { editModeActive } from '../features/transactions/transactionsSlice';
const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const { name, amount, type } = transaction;
  const handleEdit = () => {
    dispatch(editModeActive(transaction));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link">
          <img className="icon" src={editIcon} onClick={handleEdit} />
        </button>
        <button className="link">
          <img className="icon" src={deleteIcon} />
        </button>
      </div>
    </li>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.string,
  }),
};

export default TransactionItem;
