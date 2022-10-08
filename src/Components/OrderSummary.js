import React from 'react'

export default function OrderSummary({ orderSummary }) {

  let transformed = []
  for (let i = 0; i < orderSummary.length; i++) {
    if (orderSummary[i].title === 'Discount' && orderSummary[i].value == 0) {
      continue;
    }
    if (orderSummary[i].title === 'Shipping Charges' && orderSummary[i].value == 0) {
      let newItem = orderSummary[i]
      newItem.value = 'Free'
      transformed = [...transformed, newItem];
      continue;
    }

    transformed = [...transformed, orderSummary[i]]
  }

  return (
    <div className="orderTrackingCard">
      <div className="orderSummary">
        <div className="orderTracking-heading" style={{ marginTop: '15px' }}>
          Order Summary
        </div>
        <div className="orderDetailsContainer">
          <div className="titles">
            {
              transformed.map(
                (item) =>
                  item.title !== 'Total' ?
                    <div className="order-summary-title orderTracking-para">{item.title}</div>
                    : <div className="order-summary-title orderTracking-para"><strong>{item.title}</strong></div>
              )
            }
          </div>
          <div className="values" style={{ display: 'flex', flexDirection: "column", alignItems: "flex-end" }}>
            {
              transformed.map(
                (item) => item.value === "Free"
                  ? <div className="order-summary-value freeShipping orderTracking-para"> {item.value}</div>
                  : <div className="order-summary-value orderTracking-para">&#8377; {item.value}</div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
