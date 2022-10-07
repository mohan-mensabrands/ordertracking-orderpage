import React from 'react'

export default function OrderSummaryCard({ orderData }) {
  let mapping = {
    orderDate: 'Order Date',
    orderId: 'Order Id',
    orderPrice: 'Order Price',
    arrivedOn: 'Arrived On'
  }
  return (
    <div className="orderTrackingCard">
      <div className="order-summary">
        <div className="order-summary-titles">
          {orderData.map(
            (item) => <div className="order-summary-title">{mapping[item.title]}</div>
          )}
        </div>
        <div className="order-summary-values">
          {orderData.map(
            (item) => <div className="order-summary-value">{item.value}</div>
          )}
        </div>
      </div>
    </div>
  )
}
