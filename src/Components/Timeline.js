import React from "react";
import PropTypes from "prop-types";
import { RightArrow } from "../svg";

export default function Timeline({ events, orderData }) {
  if (orderData.ifCancelled || events.status === 'CANCELLED') {
    return (
      <div className="timeline orderTrackingCard">
        <div className='timeline-event orderTracking-para-bold CANCELLED' >
          <div className='dot-line CANCELLED'>
            <div className="dot"> </div>
          </div>
          Cancelled
        </div>
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
  if (events[0].title === 'Delivered' && events[0].status === 0 && events[0].dateTime) {
    return (
      <div className="timeline orderTrackingCard">
        <Event item={events[0]} eventCount={events.length} hideLine={true} />
      </div>
    )
  }

  return (
    <div className="timeline orderTrackingCard">
      {events.map((item) => (
        <Event item={item} eventCount={events.length} trackingLink={events.trackingLink}/>
      ))}
    </div>
  );
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  orderData: PropTypes.object,
};

function Event({ item, eventCount, hideLine, trackingLink }) {
  let eventClass = "timeline-event orderTracking-para-bold " + mapActiveStatus(item.status);
  let dotlineClass = "dot-line " + mapActiveStatus(item.status);
  let style = { display: "none" }
  const redirectToTrackingLink = () => {
    if (trackingLink && trackingLink !== "" && item.status === 0) {
      window.open(trackingLink, '_blank')
    }
  }
  return (
    <div className={eventClass} onClick={redirectToTrackingLink}>
      <div className={dotlineClass}>
        <div className="dot"> </div>
        {!hideLine ? <div className="line" style={eventCount === 1 ? style : {}}> </div> : <></>}
      </div>
      <div>
        {mapStatus(item.title, item.dateTime, item.status)}
      </div>
      {trackingLink !== "" ?
        <div className="arrowSvg"><RightArrow /></div> : <></>
      }
    </div>
  );
}

const mapStatus = (title, eventDate, status) => {
  var options = { month: 'short', day: 'numeric' };
  let t = new Date();
  let ed = new Date(eventDate.replace(" ", 'T'))
  // console.log('ed-->', ed, 'today-->', t);
  let dateVal = ed.toLocaleDateString('en-us', options)
  let today = ed.getDate() === t.getDate() && ed.getMonth() === t.getMonth() && ed.getFullYear() === t.getFullYear();
  const getFuture = (ed, t) => {
    if (ed.getFullYear() < t.getFullYear()) return false;
    if (ed.getFullYear() > t.getFullYear()) return true;
    if (ed.getMonth() < t.getMonth()) return false;
    if (ed.getMonth() > t.getMonth()) return true;
    if (ed.getDate() <= t.getDate()) return false;
    return true;
  }
  let future = getFuture(ed, t);
  let inProgress = status === 0
  if (title === 'Created') {
    if (today) return 'Placed Today'
    return `Placed on ${dateVal}`
  }
  if (title === 'Dispatched') return 'Shipped'
  if (title === 'Delivered') {
    if (inProgress) {
      if (today) {
        return 'Delivered Today'
      }
      if (future) return `Arriving on ${dateVal}`
      return `Delivered on ${dateVal}`
    }
    if (today) {
      return 'Arriving Today'
    }
    return `Arriving on ${dateVal}`
  }
  return title;
}

const mapActiveStatus = (status) => {
  let mapping = { 1: 'PENDING', 0: 'IN_PROGRESS', '-1': 'COMPLETE' }
  return mapping[status]
}
