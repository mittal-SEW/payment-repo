import React, { useEffect, useState } from 'react';
import Payment from './Payment';
import './App.css';

function App() {
  const [params, setParams] = useState({
    accountId: 'ACC-987654321', // Local testing default
    currentBalance: 128.50,
    currency: 'USD',
    serviceAddress: '123 Main St, Springfield, IL 62701',
    paymentMethods: [
      { code: 'mastercard', label: 'Mastercard (****2222)' },
      { code: 'amex', label: 'Amex (****3333)' },
    ]
  });

  useEffect(() => {
    const isIframe = window.parent !== window;
    if (isIframe) {
      document.body.style.backgroundColor = 'transparent';
      
      // Auto-resize logic
      const observer = new ResizeObserver((entries) => {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({ type: 'RESIZE_IFRAME', height }, '*');
      });
      observer.observe(document.body);
      
      // Initial send
      window.parent.postMessage({ type: 'RESIZE_IFRAME', height: document.documentElement.scrollHeight }, '*');
    }

    const searchParams = new URLSearchParams(window.location.search);
    const accountId = searchParams.get('accountId');
    const currentBalanceStr = searchParams.get('currentBalance');
    const currency = searchParams.get('currency');
    const serviceAddress = searchParams.get('serviceAddress');
    
    let currentBalance = undefined;
    if (currentBalanceStr && currentBalanceStr !== 'undefined' && currentBalanceStr !== 'null') {
      currentBalance = parseFloat(currentBalanceStr);
      if (isNaN(currentBalance)) currentBalance = undefined;
    }
    
    let paymentMethods = [];
    try {
      const pmParam = searchParams.get('paymentMethods');
      if (pmParam && pmParam !== 'undefined' && pmParam !== 'null') {
        paymentMethods = JSON.parse(pmParam);
      }
    } catch(e) {
      console.error("Failed to parse payment methods", e);
    }

    setParams(prev => ({
      accountId: accountId && accountId !== 'undefined' ? accountId : prev.accountId,
      currentBalance: currentBalance !== undefined ? currentBalance : prev.currentBalance,
      currency: currency && currency !== 'undefined' ? currency : prev.currency,
      serviceAddress: serviceAddress && serviceAddress !== 'undefined' ? serviceAddress : prev.serviceAddress,
      paymentMethods: paymentMethods.length > 0 ? paymentMethods : prev.paymentMethods,
    }));
  }, []);

  const handlePay = async (data) => {
    console.log('Payment data submitted:', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = {
          transactionId: 'TXN_MOCK_' + Math.floor(Math.random() * 1000000),
          paidAmount: data.amount,
          paidAt: new Date().toISOString()
        };
        
        // Notify parent iframe
        if (window.parent !== window) {
           window.parent.postMessage({ type: 'PAYMENT_SUCCESS', payload: { ...data, ...result } }, '*');
        } else {
           alert('Payment Success (Standalone Mode)');
        }
        
        resolve(result);
      }, 1500)
    });
  };

  const handleCancel = () => {
    console.log('Payment cancelled');
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'PAYMENT_CANCELLED' }, '*');
    } else {
      alert('Payment Cancelled (Standalone Mode)');
    }
  };

  const isIframe = window.parent !== window;

  return (
    <div 
      className={isIframe ? 'is-iframe' : ''}
      style={{ 
        padding: isIframe ? '0' : '3rem 1rem', 
        display: 'flex', 
        justifyContent: 'center', 
        minHeight: isIframe ? 'auto' : '100vh', 
        backgroundColor: isIframe ? 'transparent' : '#f9fafb' 
      }}
    >
      <Payment 
        accountId={params.accountId}
        currentBalance={params.currentBalance}
        currency={params.currency}
        serviceAddress={params.serviceAddress}
        paymentMethods={params.paymentMethods}
        onPay={handlePay}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;
