import React, { useState } from "react";
import PropTypes from "prop-types";
import { Help, LeftArrow } from "../svg";

export default function OrderIdAndBack({ orderId }) {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <>
      <div className="orderId-back-button orderTrackingCard">
        <div
          className="button-back"
          onClick={() =>
            document.getElementById("orderTrackingBackButton").click()
          }
        >
          <LeftArrow />
        </div>
        <div>
          <span> Order {orderId}</span>
        </div>
        <div style={{ marginRight: "auto" }}> </div>
        <div className="mensaHelpSvg" onClick={() => setShowHelp(!showHelp)}>
          <Help />
        </div>
      </div>
      {showHelp ? (
        <div className="mensaHelpSection">Please call us at 123456789</div>
      ) : (
        <></>
      )}
    </>
  );
}

OrderIdAndBack.propTypes = {
  orderId: PropTypes.string,
};
