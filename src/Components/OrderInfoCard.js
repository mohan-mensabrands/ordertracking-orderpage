import React from "react";
import PropTypes from "prop-types";
import { Timeline } from "../Components";

export default function OrderInfoCard({
  events,
  sku,
  orderData,
  onClick,
  showArrow
}) {
  let discount = Math.round(
    ((sku.itemPrice.totalPrice.replace(',', '') - sku.itemPrice.finalPrice.replace(',', '')) * 100) /
    sku.itemPrice.totalPrice.replace(',', '')
  );
  return (
    <>
      <div className="order-info orderTrackingCard">
        <img className="product-image" src={sku.imageUrl} alt="product" id="redirectToProductLink" onClick={() => window.open(sku.productLink,"_self")}/>
        <div className="product-info">
          <div className="productTitle-attributes">
            <div className="product-name orderTracking-para">{sku.title}</div>
            <div className="product-size">
              {sku.attributes.map((att) =>
               <div className="titleValuePair">{att}</div>
              )}
            </div>
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
                <span className="discount-percent">{discount}% off</span>
              </>
            ) : (
              <></>
            )}
            {sku.attributes[0].split(':')[1] > 1 ? <div className="mensaQtyXPrice">( &#8377;{` ${sku.itemPrice.pricePerUnit} X ${sku.attributes[0].split(':')[1]} )`}</div> : <></>}
          </div>
        </div>
      </div>
      <CreateTimeline
        events={events}
        sku={sku}
        orderData={orderData}
        onClick={onClick}
        showArrow={showArrow}
      />
      {/* <CancelOrder onClick={onClick}/> */}
    </>
  );
}

const CreateTimeline = ({ events, sku, orderData, onClick, showArrow }) => {
  // console.log('trackingLink', sku.trackingLink);
  // console.log("all events", events);
  let itemsMap = new Map();
  for (let index in events) {
    itemsMap.set(events[index].itemId.split('-')[0], events[index])
  }
  // let returnIndex = -1;
  let eventsProp = []
  const sortf = (a, b) => {
    if (a.index > b.index) return -1
    return 1
  }
  if (!events || orderData.ifCancelled) {
    return (
      <Timeline
        events={[]}
        orderData={orderData}
        showArrow={showArrow}
      />
    );
  }
  // if (events && events.length > 0 && sku && sku.itemId) {
  //   Object.keys(events).forEach(function (key, index) {
  //     if (events[key].itemId.split('-')[0] === sku.itemId) {
  //       returnIndex = index;
  //       eventsProp = events[key].events.sort(sortf);
  //       eventsProp.status = events[key].status;
  //       eventsProp.trackingLink = sku.trackingLink;
  //     }
  //   });
  // }
  // if (returnIndex > -1) {
  //   return (
  //     <Timeline
  //       events={eventsProp}
  //       orderData={orderData}
  //     />
  //   );
  // }
  if (itemsMap.has(sku.itemId)) {
    eventsProp = itemsMap.get(sku.itemId).events.sort(sortf);
    eventsProp.status = itemsMap.get(sku.itemId).status;
    eventsProp.trackingLink = sku.trackingLink;
    eventsProp.itemId = sku.itemId
    return (
      <Timeline
        events={eventsProp}
        orderData={orderData}
        onClick={onClick}
        showArrow={showArrow}
      />
    );
  }
  return (
    <Timeline
      events={[{ index: 0, title: 'Created', status: 0, dateTime: orderData.orderDate, trackingLink: sku.trackingLink }]}
      orderData={orderData}
      onClick={onClick}
      showArrow={showArrow}
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
