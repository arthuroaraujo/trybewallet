import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="Wallet">
        <div className="Wallet-container">
          <Header />
          <WalletForm />
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
