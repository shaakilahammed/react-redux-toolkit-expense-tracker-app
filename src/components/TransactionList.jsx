import { useEffect } from 'react';
import TransactionItem from './TransactionItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transactions/transactionsSlice';
const TransactionList = () => {
  const dispatch = useDispatch();
  const { isLoading, transactions, isError, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>
          <TransactionItem />
        </ul>
      </div>
    </>
  );
};

export default TransactionList;
