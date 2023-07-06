import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
