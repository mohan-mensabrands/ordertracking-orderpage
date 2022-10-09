import React from "react";
import PropTypes from "prop-types";
import { Timeline } from "../Components";

export default function OrderInfoCard({
  events,
  sku,
  orderData
}) {
  let discount = Math.floor(
    ((sku.itemPrice.totalPrice - sku.itemPrice.finalPrice) * 100) /
      sku.itemPrice.totalPrice
  );
  return (
    <>
      <div className="order-info orderTrackingCard">
        <img className="product-image" src={sku.imageUrl} alt="product" />
        <div className="product-info">
          <div className="product-name orderTracking-para">{sku.title}</div>
          <div className="product-size">
            <span className="title">Size: </span>
            <span className="value">{sku.size}</span>
            <span className="spacer"></span>
            <span className="title">Color: </span>
            <span className="value">{sku.color}</span>
            <span className="spacer"></span>
            <span className="title">Qty: </span>
            <span className="value">{sku.quantity}</span>
          </div>
          <div className="price">
            <span className="final-price">
              &#8377; {sku.itemPrice.finalPrice}
            </span>
            {parseInt(discount) > 0 ? (
              <>
                <span className="full-price">
                  {" "}
                  &#8377; {sku.itemPrice.totalPrice}
                </span>
                <span className="discount-percent">{discount}%</span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <CreateTimeline
        events={events}
        sku={sku}
        orderData={orderData}
      />

      {/* <CancelOrder /> */}
    </>
  );
}

const CreateTimeline = ({ events, sku, orderData }) => {
  let returnIndex = -1;
  if(!events || orderData.ifCancelled || orderData.ifDelivered) {
    return (
      <Timeline
        events={[]}
        orderData={orderData}
      />
    );
  }
  if(events && events.length > 0 && sku && sku.itemId){
    Object.keys(events).forEach(function (key, index) {
      if (events[key].itemId === sku.itemId) {
        console.log("found at", events[returnIndex]);
        returnIndex = index;
      }
    });
  }
  if (returnIndex > -1) {
    return (
      <Timeline
        events={events[returnIndex].events}
        orderData={orderData}
      />
    );
  }
  return (
    <Timeline
      events={[]}
      orderData={orderData}
    />
  );
};

OrderInfoCard.propTypes = {
  sku: PropTypes.shape({
    color: PropTypes.string,
    imageUrl: PropTypes.string,
    itemId: PropTypes.string,
    itemPrice: PropTypes.shape({
      finalPrice: PropTypes.string,
      totalPrice: PropTypes.string,
    }),
    quantity: PropTypes.string,
    size: PropTypes.string,
    title: PropTypes.string,
  }),
  ifCancelled: PropTypes.bool,
  ifDelivered: PropTypes.bool,
  events: PropTypes.arrayOf(PropTypes.object),
};
