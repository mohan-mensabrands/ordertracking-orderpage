import React from "react";
import PropTypes from "prop-types";

export default function Timeline({ events, orderData }) {
  if (orderData.ifDelivered) {
    return (
      <div className="timeline">
        <div className="mensaDeliveredOrder">Delivered</div>
      </div>
    );
  }
  if (orderData.ifCancelled) {
    return (
      <div className="timeline">
        <div className="mensaCancelledOrder">Cancelled</div>
      </div>
    );
  }

  if (!events || events.length < 1) {
    return (
      <div className="timeline">
        {orderData.today === orderData.orderDate ? (
          <div className="mensaOrdered">Ordered Today</div>
        ) : (
          <div className="mensaOrdered">{`Ordered on ${orderData.orderDate}`}</div>
        )}
      </div>
    );
  }
  return (
    <div className="timeline orderTrackingCard">
      {events.map((item) => (
        <Event item={item} />
      ))}
    </div>
  );
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  orderData: PropTypes.object,
};

function Event({ item }) {
  console.log("logging event ---> ", item);
  let eventClass = "timeline-event orderTracking-para-bold " + item.status;
  let dotlineClass = "dot-line " + item.status;
  return (
    <div className={eventClass}>
      <div className={dotlineClass}>
        <div className="dot"> </div>
        <div className="line"> </div>
      </div>
      {item.title}
    </div>
  );
}
