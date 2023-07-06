import PropTypes from 'prop-types';
import deleteIcon from '../assets/images/delete.svg';
import editIcon from '../assets/images/edit.svg';
const TransactionItem = ({ transaction }) => {
  const { name, amount, type } = transaction;
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link">
          <img className="icon" src={editIcon} />
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
