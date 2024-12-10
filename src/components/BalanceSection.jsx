/* eslint-disable react/prop-types */
import React from 'react';

const BalanceSection = ({ balance, showBalance, toggleBalance }) => {
  return (
    <div className="flex-1 bg-cover bg-center p-6 rounded-lg"
      style={{
        backgroundImage: "url('./src/assets/Website Assets/Background Saldo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px',
        height: '200px'
      }}>
      <h2 className="text-2xl font-semibold text-white mb-4">Saldo Anda</h2>
      {showBalance ? (
        <div className="text-xl text-white font-semibold">
          Rp {balance.toLocaleString('id-ID')}
        </div>
      ) : (
        <div className="text-xl text-white font-semibold">*******</div>
      )}
      <button onClick={toggleBalance} className="mt-4 text-white underline">
        {showBalance ? 'Sembunyikan Saldo' : 'Tampilkan Saldo Anda'}
      </button>
    </div>
  );
};

export default BalanceSection;
