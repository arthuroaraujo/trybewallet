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
          <div className="Wallet-intro">
            <div>
              <span className="Wallet-eyebrow">Painel financeiro</span>
              <h1>Visao geral da sua carteira</h1>
              <p>
                Adicione despesas, acompanhe a cotacao e mantenha seus gastos
                em ordem.
              </p>
            </div>
          </div>
          <Header />
          <WalletForm />
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
