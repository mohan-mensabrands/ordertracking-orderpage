import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import {
  Addresses,
  AllEvents,
  HelpModal,
  OrderIdAndBack,
  OrderInfoCard,
  OrderSummary,
  PaymentCard,
} from "./Components";

// import evRes from './response.json'

function App({ orderData }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [loadingAllEvents, setLoadingAllEvents] = useState(false);

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
      try {
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
      } catch (error) {
        console.error('error fetching api, please check network');
        setLoading(false);
      }
      // setEvents(evRes.data)

    };
    fetchData();
  }, [
    setEvents,
    orderData
  ]);

  const sortSubEvents = (scans) => {
    return scans.sort((a, b) => {
      if (a.date > b.date) return -1
      return 1
    })
  }
  const toggleAllEvents = (trackingNumber) => {
    console.log('calling TRN', trackingNumber)
    setLoadingAllEvents(true)
    setShowAllEvents(!showAllEvents)
    fetch(`https://0wc7s8r4h7.execute-api.ap-south-1.amazonaws.com/api/v1/tracking/info/${trackingNumber}`)
      .then((res) => res.json())
      .then((res) => setAllEvents(sortSubEvents(JSON.parse(res.data.trackingInfoDetail.scans))))
      .then(() => setLoadingAllEvents(false))
      .catch(() => setLoadingAllEvents(false))
  }

  if (loading) {
    return <div className="orderTracking-loader">Loading...</div>;
  }

  return (
    <div className="mensaOrderPage">
      <OrderIdAndBack orderId={orderData.orderName} onClick={() => setShowHelp(!showHelp)} />
      <hr className="saparator-1px" />
      {orderData.lineItems.map((sku) => {
        return (
          <>
            <OrderInfoCard
              events={events}
              sku={sku}
              orderData={orderData}
              onClick={() => { 
                if(sku.trackingNumber && sku.trackingNumber.trim() !== '') toggleAllEvents(sku.trackingNumber)
              }}
              showArrow={sku.trackingNumber && sku.trackingNumber.trim() !== ''}
            />
            {/* <div 
              className="mensaViewMore" 
              id={'seeAllUpdates'+sku.itemId}
              onClick={() => toggleAllEvents(sku.trackingNumber)} 
              style={!sku.trackingNumber ? {display:'none'} : {}}
            >{showAllEvents ? 'Close' : 'See All Updates'}</div> */}
            <hr className="saparator" />
          </>
        );
      })}

      <PaymentCard paymentMode={orderData.financialStatus === 'paid' ? 'Paid' : 'Pay on Delivery'} />
      <hr className="saparator" />
      <Addresses addressData={orderData.addresses} />
      <hr className="saparator" />
      <OrderSummary orderSummary={orderData.orderSummary} />
      <HelpModal contactDetails={orderData.contactDetails} show={showHelp} onClose={() => setShowHelp(false)} />
      <AllEvents allEvents={allEvents} loading={loadingAllEvents} show={showAllEvents} onClose={() => setShowAllEvents(false)} />
    </div>
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
