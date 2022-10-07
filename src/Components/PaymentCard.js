import React from 'react'

export default function PaymentCard({ paymentMode }) {
  return (
    <div className="paymentMode orderTrackingCard">
      <div className="orderTracking-heading" 
        style={{marginTop:'14px'}}>Payment Mode</div>
      <div className="orderTracking-para" 
        style={{lineHeight:'200%', marginTop:'11px' }}>{paymentMode}</div>
    </div>
  )
}
