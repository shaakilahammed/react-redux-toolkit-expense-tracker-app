import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import deleteIcon from '../assets/images/delete.svg';
import editIcon from '../assets/images/edit.svg';
import {
  editModeActive,
  editModeInactive,
  removeTransaction,
} from '../features/transactions/transactionsSlice';
import numberWithCommas from '../utils/numberWithCommas';
const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const { id, name, amount, type } = transaction;
  const handleEdit = () => {
    dispatch(editModeActive(transaction));
  };
  const handleDelete = () => {
    dispatch(removeTransaction(id));
    dispatch(editModeInactive());
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link">
          <img className="icon" src={editIcon} onClick={handleEdit} />
        </button>
        <button className="link">
          <img className="icon" src={deleteIcon} onClick={handleDelete} />
        </button>
      </div>
    </li>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.string,
  }),
};

export default TransactionItem;
