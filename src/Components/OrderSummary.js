import React from 'react'

export default function OrderSummary({ orderSummary }) {

  let transformed = []
  for (let i = 0; i < orderSummary.length; i++) {
    if (orderSummary[i].title === 'Discount' && orderSummary[i].value === 0.00) {
      continue;
    }
    if (orderSummary[i].title === 'Shipping Charges' && orderSummary[i].value === 0.00) {
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
        <div className="orderTracking-heading titleMargin">
          Order Summary
        </div>
        <div className="orderDetailsContainer">
          <div className="titles">
            {
              transformed.map(
                (item) =>
                  item.title !== 'Total' ?
                    item.title === 'Discount' && item.value > 0 ?
                      <div className="order-summary-title orderTracking-para">{item.title} <strong style={{paddingLeft:'10px'}}>{item && item.code ? `(${item.code})` : ''}</strong></div>:
                      <div className="order-summary-title orderTracking-para">{item.title}</div>
                      : <div className="order-summary-title orderTracking-para mensaTotal">{item.title}</div>
              )
            }
          </div>
          <div className="values" style={{ display: 'flex', flexDirection: "column", alignItems: "flex-end" }}>
            {
              transformed.map(
                (item) => item.value === "Free"
                  ? <div className="order-summary-value freeShipping mensaOSValue"> {item.value}</div>
                  : item.title === 'Total' ?
                  <div className={`order-summary-value mensaOSValue totalValue`}>&#8377; {item.value}</div>:
                  <div className={`order-summary-value mensaOSValue ${item.title}`}>&#8377; {item.value}</div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
