import React from 'react'
import { Timeline, CancelOrder } from '../Components'

export default function OrderInfoCard({ sku }) {
  let items = sku.events
  let discount = Math.floor(
    (sku.fullPrice - sku.finalPrice) * 100 / sku.fullPrice
  )
  return (
    <>
      <div className='order-info orderTrackingCard'>
        <img className='product-image' src={sku.imageUrl} alt="product" />
        <div className='product-info'>
          <div className="product-name orderTracking-para">{sku.name}</div>
          <div className="product-size">
            <span className="title">Size: </span>
            <span className="value">{sku.size}</span>
            <span className="spacer"></span>
            <span className="title">Qty: </span>
            <span className="value">{sku.quantity}</span>
          </div>
          <div className="price">
            <span className="final-price">&#8377; {sku.finalPrice}</span>
            <span className="full-price"> &#8377; {sku.fullPrice}</span>
            <span className="discount-percent">{discount > 0 ? (`${discount}%`) : ""}</span>
          </div>
        </div>
      </div>
      <Timeline items={items} />
      <CancelOrder />
    </>
  )
}
