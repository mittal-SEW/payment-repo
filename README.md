# Payment Module Processor

This repository contains a standalone, plug-and-playable Payment Module designed to be integrated into any React application. It supports Credit Card and Bank Transfer payment methods.

## Features
- **Plug-and-Play**: Can be integrated as a standard React component or via Module Federation.
- **Isolated Testing**: Running the project in development mode displays the payment processor in a clean, isolated environment.
- **Form Validation**: Real-time validation for credit cards (Luhn-style logic, CVV, expiry) and bank accounts.
- **Responsive Design**: Built with modern CSS (Glassmorphism/Minimalism) that adapts to host application styles.

## Quick Start for Developers

To run this project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mittal-SEW/payment-repo.git
   cd payment-repo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5001`. You will see the payment processor rendered with mock data for testing.

## Integration Guide

To use this module in your own project, import the `Payment` component:

```javascript
import Payment from './Payment';

const MyPage = () => {
  const handlePay = async (data) => {
    // Submit payment data to your API
    console.log(data);
  };

  return (
    <Payment 
      accountId="YOUR_ACCOUNT_ID"
      currentBalance={100.00}
      onPay={handlePay}
    />
  );
};
```

## Module Federation (Remote)
This project is configured as a Remote for Module Federation. It exposes the `./Payment` component.
See `vite.config.js` for details.
