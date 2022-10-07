import { useEffect, useState } from 'react';
import './App.css';
import { Addresses, OrderIdAndBack, OrderInfoCard, OrderSummary, PaymentCard } from './Components';

function App({orderData}) {
  const [skus, setSkus] = useState([])
  const [loading, setLoading] = useState(false);
  console.log(orderData);
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`https://0wc7s8r4h7.execute-api.ap-south-1.amazonaws.com/api/v1/shopify/details?channelOrderId=${document.getElementsByName('tracking-order-id')[0].innerText}`,
  //     {
  //       headers: {
  //         'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJ2aXNoYWwuY2hhdHVydmVkaUBtZW5zYWJyYW5kcy5jb20iLCJzdWIiOiIzNCIsImlhdCI6MTY2MjAyOTg1OSwianRpIjoiMGE3M2YxOTQtNzA5OS00MGRmLWFiNGItYWU3YjdjMzZjNGY4IiwiZXhwIjoxNzQ4NDI5ODU5fQ.ocNJhggQi2rlqYlGhM3kQPBukdYO_nvcZGXmG0PiW7I'
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       // data.status.statusCode !== 6000
  //       // take data from shopify
  //       // else
  //       let orderRes = JSON.parse(document.getElementsByName('tracking-order-json')[0].innerText);
  //       let sku = data.data.orderSkus;
  //       var dateFormate = { month: 'short', day: 'numeric' };
  //       orderRes.map((item, i) => {
  //         let skuStatus = {};
  //         let statusDate = new Date(sku[i].customerPromiseDate.replace(" ", "T"));
  //         console.log("date time", statusDate )
  //         if (statusDate > new Date()) {
  //           skuStatus = { title: "Arriving On", state: "not" }
  //         }
  //         if (statusDate.getDate() === new Date().getDate()) {
  //           skuStatus = { title: "Arriving Today", state: "not" }
  //         }
  //         if (statusDate < new Date()) {
  //           skuStatus = { title: "Delivered", state: "in-progress" }
  //         }
  //         let temp =
  //         {
  //           imageUrl: item.product.image.src,
  //           name: item.title,
  //           size: "to be figured out",
  //           quantity: item.quantity,
  //           finalPrice: item.price,
  //           fullPrice: item.variant.compare_at_price,
  //           events: [
  //             { event: skuStatus.title, state: skuStatus.state },
  //             { event: "Shipped", state: "completed" },
  //             { event: `Placed on ${new Date(sku[i].confirmDate.replace(" ", "T")).toLocaleDateString("en-US", dateFormate)}`, state: "completed" },
  //           ]
  //         }
  //         setSkus([...skus, temp])
  //         setLoading(false);
  //       })
      
  //      });
  // }, [setSkus])

//   let orderid = document.getElementsByName('tracking-order-id')[0].innerText;
//   // let paymentMode1 = document.getElementsByName('tracking-payment-status')[0].innerText;
//   // let all_images = document.getElementsByName('tracking-product-image')[0].childNodes[0].currentSrc
//   // let all_productNames = document.getElementsByName('tracking-product-name')[0].innerText;
//   // let all_Prices = document.getElementsByName('tracking-product-price-final')[0].innerText;
//   // let all_fullPrices = document.getElementsByName('tracking-product-price-full')[0].innerText;
//   // let all_quantity = document.getElementsByName('tracking-product-quantity')[0].innerText;
//   // let all_size = document.getElementsByName('tracking-product-size')[0].innerText;
//   // let billingaddress = document.getElementsByName('tracking-product-size')[0].innerText;
//   let orderRes = JSON.parse(document.getElementsByName('tracking-order-json')[0].innerText);

//   let shippingAddress = JSON.parse(document.getElementsByName('tracking-shipping-address')[0].innerText);
//   let billingAddress = JSON.parse(document.getElementsByName('tracking-billing-address')[0].innerText);
// /* 
//   var dateFormate = { month: 'short', day: 'numeric' };

//   orderRes.map((item, i) => {
//     let skuStatus = {};
//     console.log("index-->", i);
//     console.log("response date-->", sku[i].customerPromiseDate)
//     // console.log("date time", new Date(sku[i].customerPromiseDate) )
//     // if (new Date(sku[i].customerPromiseDate) > new Date()) {
//     //   skuStatus = { title: "Arriving On", state: "not" }
//     // }
//     // if (new Date(sku[i].customerPromiseDate).getDate() === new Date().getDate()) {
//     //   skuStatus = { title: "Arriving Today", state: "not" }
//     // }
//     // if (new Date(sku[i].customerPromiseDate) < new Date()) {
//     //   skuStatus = { title: "Arrived", state: "completed" }
//     // }
//     let temp =
//     {
//       imageUrl: item.product.image.src,
//       name: item.title,
//       size: "to be figured out",
//       quantity: item.quantity,
//       finalPrice: item.price,
//       fullPrice: item.variant.compare_at_price,
//       events: [
//         { event: skuStatus.title, state: skuStatus.state },
//         { event: "Shipped", state: "completed" },
//         { event: `Placed on ${new Date(sku.confirmDate).toLocaleDateString("en-US", dateFormate)}`, state: "completed" },
//       ]
//     }
//     skus.push(temp)

//     console.log("skus",skus)
//   })
//   */

//   // skus = [
//   //   {
//   //     imageUrl: "https://picsum.photos/90/120?random=1",
//   //     name: "villain revolver eau de parfum for men",
//   //     size: "100ml",
//   //     quantity: "01",
//   //     finalPrice: "1129",
//   //     fullPrice: "1299",
//   //     events: [
//   //       { event: "Arriving today", state: "not" },
//   //       { event: "Out for Delivery", state: "in-progress" },
//   //       { event: "Shipped", state: "completed" },
//   //       { event: "Placed on Sep 12", state: "completed" },
//   //     ]
//   //   },
//   //   {
//   //     imageUrl: "https://picsum.photos/90/120?random=2",
//   //     name: "villain revolver eau de parfum for women",
//   //     size: "200ml",
//   //     quantity: "03",
//   //     finalPrice: "7999",
//   //     fullPrice: "8999",
//   //     events: [
//   //       { event: "Arriving today", state: "not" },
//   //       { event: "Out for Delivery", state: "not" },
//   //       { event: "Shipped", state: "in-progress" },
//   //       { event: "Placed on Sep 13", state: "completed" },
//   //     ]
//   //   },
//   // ]

//   // let orderSummary =
//   //   [
//   //     { title: "orderDate", value: "01/02/2022" },
//   //     { title: "orderId", value: "1234141241234" },
//   //     { title: "orderPrice", value: 1299 },
//   //     { title: "arrivedOn", value: "04/02/2022" }
//   //   ]

//   let addressData = [
//     { title: 'shippingAddress', label: "Shipping Address", value: shippingAddress },
//     { title: 'billingAddress', label: "Billing Address", value: billingAddress },
//   ]

//   const fetchElement = (id) => {
//     console.log("value price ---> " + document.getElementsByName(id)[0].innerText)
//     return document.getElementsByName(id)[0].innerText
//   }

//   let orderValueSummary = [
//     { title: 'Total MRP', value: fetchElement("order-tracking-price-mrp") },
//     { title: 'Discount', value: fetchElement("order-tracking-price-discount") },
//     { title: 'Sub Total', value: fetchElement("order-tracking-price-subtotal") },
//     { title: 'Shipping Charges', value: fetchElement("order-tracking-price-shipping")},
//     { title: 'Tax', value: fetchElement("order-tracking-price-tax")},
//     { title: 'Total', value: fetchElement("order-tracking-price-total")}
//   ]
//   // let paymentMode = 'Credit Card'

  if(loading){
    return(
      <div className='orderTracking-loader'>Loading...</div>
    )
  }

  return (
    <>
      <div>{orderData.toString()}</div>
      {/* <OrderIdAndBack orderId={orderid} />
      <hr className="saparator-1px" />
      {skus.map(
        (sku) => {
          return (
            <>
              <OrderInfoCard sku={sku} />
              <hr className='saparator' />
            </>
          )
        }
      )}
      <hr className='saparator' />
      <Addresses addressData={addressData} />
      <hr className='saparator' />
      <OrderSummary orderSummary={orderValueSummary} /> */}
    </>
  )
}

export default App;
