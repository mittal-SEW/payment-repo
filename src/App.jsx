import React from 'react';
import Payment from './Payment';
import './App.css';

function App() {
  const handlePay = async (data) => {
    console.log('Payment data submitted:', data);
    // Simulate API delay
    return new Promise((resolve) => setTimeout(() => resolve({
      transactionId: 'TXN_MOCK_' + Math.floor(Math.random() * 1000000),
      paidAmount: data.amount,
      paidAt: new Date().toISOString()
    }), 1500));
  };

  const handleCancel = () => {
    console.log('Payment cancelled');
    alert('Payment has been cancelled.');
  };

  const mockPaymentMethods = [
    { code: 'mastercard', label: 'Mastercard (****2222)' },
    { code: 'amex', label: 'Amex (****3333)' },
  ];

  return (
    <div style={{ padding: '3rem 1rem', display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Payment 
        accountId="ACC-987654321"
        currentBalance={128.50}
        currency="USD"
        serviceAddress="123 Main St, Springfield, IL 62701"
        paymentMethods={mockPaymentMethods}
        onPay={handlePay}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;
