import TransactionItem from './TransactionItem';

const TransactionList = () => {
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
