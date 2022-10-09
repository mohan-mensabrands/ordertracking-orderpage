import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import {
  Addresses,
  OrderIdAndBack,
  OrderInfoCard,
  OrderSummary,
  PaymentCard,
} from "./Components";

function App({ orderData }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderData.ifDelivered) {
      console.log("order is delivered!");
      return;
    }
    if (orderData.ifCancelled) {
      console.log("order was cancelled!");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      let event = await fetch(
        `https://0wc7s8r4h7.execute-api.ap-south-1.amazonaws.com/api/v1/shopify/details?channelOrderId=${orderData.orderId}`,
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJ2aXNoYWwuY2hhdHVydmVkaUBtZW5zYWJyYW5kcy5jb20iLCJzdWIiOiIzNCIsImlhdCI6MTY2MjAyOTg1OSwianRpIjoiMGE3M2YxOTQtNzA5OS00MGRmLWFiNGItYWU3YjdjMzZjNGY4IiwiZXhwIjoxNzQ4NDI5ODU5fQ.ocNJhggQi2rlqYlGhM3kQPBukdYO_nvcZGXmG0PiW7I",
          },
        }
      );
      setLoading(false);
      let res = await event.json();

      if (res.status.statusCode !== 6000) {
        console.log("order not found!");
        return;
      }
      setEvents(res.data);
    };
    fetchData();

    // var dateFormate = { month: 'short', day: 'numeric' };
    // let statusDate = new Date(sku[i].customerPromiseDate.replace(" ", "T"));
  }, [
    setEvents,
    orderData
  ]);

  if (loading) {
    return <div className="orderTracking-loader">Loading...</div>;
  }

  return (
    <>
      <OrderIdAndBack orderId={orderData.orderId} />
      <hr className="saparator-1px" />
      {orderData.lineItems.map((sku) => {
        return (
          <>
            <OrderInfoCard
              events={events}
              sku={sku}
              orderData={orderData}
            />
          </>
        );
      })}
      <hr className="saparator" />
      <OrderSummary orderSummary={orderData.orderSummary} />
      <hr className="saparator" />
      <PaymentCard paymentMode={orderData.financialStatus==='paid' ? 'Paid' : 'Cash on Delivery'}/>
      <hr className="saparator" />
      <Addresses addressData={orderData.addresses} />
    </>
  );
}

App.propTypes = {
  orderData: PropTypes.shape({
    addresses: PropTypes.arrayOf(PropTypes.object),
    financialStatus: PropTypes.string,
    ifCancelled: PropTypes.bool,
    ifDelivered: PropTypes.bool,
    lineItems: PropTypes.arrayOf(PropTypes.object),
    orderId: PropTypes.string,
    orderSummary: PropTypes.arrayOf(PropTypes.object),
    orderDate: PropTypes.string
  }),
};

export default App;
