import { useSelector } from 'react-redux';
import numberWithCommas from '../utils/numberWithCommas';

const Balance = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const calculateBalance = () => {
    let total = 0;
    transactions.length > 0 &&
      transactions.forEach((item) => {
        const { type, amount } = item;
        type === 'expense' ? (total -= amount) : (total += amount);
      });
    return total;
  };
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{numberWithCommas(calculateBalance())}</span>
      </h3>
    </div>
  );
};

export default Balance;
