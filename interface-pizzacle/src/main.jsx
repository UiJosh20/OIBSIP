import React from 'react'
import ReactDOM from 'react-dom/client'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
const stripePromise = loadStripe('pk_test_51P0l9sEerolS46elWwCq2OUlVcH0KBwrWen0YzvHdHBeH1R2MwrzhyizHAlR5typCSCkHEJpmeOv10HII0kEvN0a00M56ihCaR');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
    <Elements stripe={stripePromise}>
    <App />
    </Elements>
    </BrowserRouter>
  </React.StrictMode>
)
