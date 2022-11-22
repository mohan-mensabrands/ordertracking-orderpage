import React from 'react'

export default function cancelOrder({onClick}) {
  return (
    <div className='orderTrackingCard'>
      <div className="cancel-order" onClick={onClick}>
        <span className="orderTracking-para-bold">
          Contact Customer Support
        </span>
        <div className='cancel-order-arrow'>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L8.5 9L1 16.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
