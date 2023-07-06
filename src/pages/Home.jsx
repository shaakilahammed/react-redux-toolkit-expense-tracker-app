import Balance from '../components/Balance';
import Form from '../components/Form';
import Layout from '../components/Layout';
import TransactionList from '../components/TransactionList';

const Home = () => {
  return (
    <Layout>
      <div className="main">
        <div className="container">
          <Balance />

          <Form />

          <TransactionList />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
