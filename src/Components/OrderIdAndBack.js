import React from "react";
import PropTypes from "prop-types";
import { Help } from "../svg";

export default function OrderIdAndBack({ orderId, onClick }) {
  return (
    <>
      <div className="orderId-back-button orderTrackingCard">
        {/* <div
          className="button-back"
          onClick={() =>
            document.getElementById("orderTrackingBackButton").click()
          }
        >
          <LeftArrow />
        </div> */}
        <div className="orderTracking-heading">
          Order Id: {orderId}
        </div>
        <div className="helpIcon" id="orderHelp" onClick={onClick}>
          <div className="helpText ">Help</div> 
          <Help />
        </div>
      </div>
    </>
  );
}

OrderIdAndBack.propTypes = {
  orderId: PropTypes.string,
};
