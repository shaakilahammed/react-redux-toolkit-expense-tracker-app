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

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>{error}</p>;
  if (!isLoading && !isError && transactions?.length === 0)
    content = <p>No transaction found</p>;
  if (!isLoading && !isError && transactions?.length > 0)
    content = transactions.map((item) => (
      <TransactionItem key={item.id} transaction={item} />
    ));

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default TransactionList;
