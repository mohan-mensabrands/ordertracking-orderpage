import React from "react";
import PropTypes from "prop-types";

export default function Timeline({ events, ifCancelled, ifDelivered }) {
  if (ifDelivered) {
    return (
      <div className="timeline">
        <div className="mensaDeliveredOrder">Delivered</div>
      </div>
    );
  }
  if (ifCancelled) {
    return (
      <div className="timeline">
        <div className="mensaCancelledOrder">Cancelled</div>
      </div>
    );
  }

  if (!events || events.length < 1) {
    return <></>;
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
  ifCancelled: PropTypes.bool,
  ifDelivered: PropTypes.bool,
};

function Event({ item }) {
  console.log("logging event ---> ", item);
  let eventClass = "timeline-event orderTracking-para-bold " + item.state;
  let dotlineClass = "dot-line " + item.state;
  return (
    <div className={eventClass}>
      <div className={dotlineClass}>
        <div className="dot"> </div>
        <div className="line"> </div>
      </div>
      {item.event}
    </div>
  );
}
