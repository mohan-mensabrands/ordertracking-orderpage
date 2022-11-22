import React from 'react';
import PropTypes from 'prop-types';

export default function PaymentCard({ paymentMode }) {
  return (
    <div className="paymentMode orderTrackingCard">
      <div className="orderTracking-heading titleMargin">Payment Mode</div>
      <div className="orderTracking-para" 
        style={{lineHeight:'200%', marginBottom:'24px' }}>{paymentMode}</div>
    </div>
  )
}

PaymentCard.prototype = {
  paymentMode : PropTypes.string
}

