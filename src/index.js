import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('order-tracking'));

let orderData = {};

const getData = (name) => {
  try {
    return document.getElementsByName(name)[0].innerText
  } catch (error) {
    return ''
  }
}

const shippingAddress = () => {
  try {
    return JSON.parse(document.getElementsByName('addresses')[0].children.shippingAddress.innerText)
  } catch (error) {
    return ''
  }
}

orderData = {...orderData, 
  orderId : getData('orderId'), 
  financialStatus: getData('financialStatus'),
  shippingAddress: shippingAddress(),
}



root.render(
  <React.StrictMode>
    <App orderData={orderData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
