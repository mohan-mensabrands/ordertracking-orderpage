import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("order-tracking"));

let orderData = {};

const getData = (name) => {
  try {
    return document.getElementsByName(name)[0].innerText;
  } catch (error) {
    return "";
  }
};

const billingAddress = () => {
  try {
    return JSON.parse(
      document.getElementsByName("addresses")[0].children.billingAddress
        .innerText
    );
  } catch (error) {
    return "";
  }
};

const shippingAddress = () => {
  try {
    return JSON.parse(
      document.getElementsByName("addresses")[0].children.shippingAddress
        .innerText
    );
  } catch (error) {
    return "";
  }
};
const getAddresses = () => {
  let toRet = [];
  let add = shippingAddress();
  const getEle = (key) => {
    try {
      if (add[key]) {
        return add[key];
      }
    } catch (error) {
      console.error("error in " + key);
      return "";
    }
  };
  if (add != null) {
    let sa = {
      title: "shippingAddress",
      label: "Shipping Address",
      value: `${getEle("name")}, ${getEle("address1")}, ${getEle(
        "address2"
      )}, ${getEle("city")}, ${getEle("province")}, ${getEle("zip")}`,
      contact: getEle("phone"),
    };
    toRet.push(sa);
  }
  add = billingAddress();
  if (add != null) {
    let ba = {
      title: "billingAddress",
      label: "Billing Address",
      value: `${getEle("name")}, ${getEle("address1")}, ${getEle(
        "address2"
      )}, ${getEle("city")}, ${getEle("province")}, ${getEle("zip")}`,
      contact: getEle("phone"),
    };
    toRet.push(ba);
    return toRet;
  }
};

const getOrderSummary = () => {
  let orderSummary = [];
  // totalMRP disc sub shipping total
  let raw = { totalMRP: 0, discount: 0, subTotal: 0, shipping: 0,tax:0, total: 0 };
  try {
    raw.total =
      document.getElementsByName("orderSummary")[0].children.total.innerText;
  } catch (error) {
    console.error("error fetching total ");
  }
  try {
    raw.shipping =
      document.getElementsByName(
        "orderSummary"
      )[0].children.shippingCharges.innerText;
  } catch (error) {
    console.error("error fetching shipping charge");
  }
  try {
    raw.discount =
      document.getElementsByName("orderSummary")[0].children.discount.innerText;
  } catch (error) {
    console.error("error fetching discount");
  }
  try {
    raw.tax =
      document.getElementsByName("orderSummary")[0].children.tax.innerText;
  } catch (error) {
    console.error("error fetching tax");
  }

  let mrp = {
    title: "Total MRP",
    value:
      parseFloat(raw.total) -
      parseFloat(raw.shipping) +
      parseFloat(raw.discount) -
      parseFloat(raw.tax)
      ,
  };
  let discount = {title: 'Discount', value: parseFloat(raw.discount)}
  let subTotal = {title: 'SubTotal', value: mrp.value - discount.value}
  let shipping = {title: 'Shipping', value: parseFloat(raw.shipping)}
  let total = {title: 'Total', value: raw.total}
  let tax = {title: 'Tax', value: raw.tax}
  orderSummary.push(mrp, discount, subTotal, shipping,tax, total)
  return orderSummary;
};

const getItems = () => {
  let parsedItems = [];
  let items = document.getElementsByName("lineItems")[0].childNodes;
  items.forEach((item) => {
    let itemToPush = {
      itemId: "",
      title: "",
      size: "",
      color: "",
      imageUrl: "",
      itemPrice: {
        totalPrice: "",
        finalPrice: "",
      },
      quantity: "",
    };
    try {
      itemToPush.itemId = item.children.itemId.innerText;
    } catch (error) {
      console.error("item Id not found");
    }

    try {
      itemToPush.title = item.children.itemTitle.innerText;
    } catch (error) {
      console.error("item Title not found");
    }

    try {
      itemToPush.imageUrl = item.children.itemImage.children[0].currentSrc;
    } catch (error) {
      console.error("item image not found");
    }

    try {
      itemToPush.itemPrice.totalPrice =
        item.children.itemPrice.children.totalPrice.innerText;
    } catch (error) {
      console.error("item total price not found");
    }

    try {
      itemToPush.itemPrice.finalPrice =
        item.children.itemPrice.children.finalPrice.innerText;
    } catch (error) {
      console.error("item Final Price not found");
    }

    try {
      itemToPush.quantity = item.children.quantity.innerText;
    } catch (error) {
      console.error("item qty not found");
    }
    try {
      itemToPush.quantity = item.children.quantity.innerText;
    } catch (error) {
      console.error("item qty not found");
    }
    try {
      itemToPush.size = item.children.size.innerText;
    } catch (error) {
      console.error("item size not found");
    }
    try {
      itemToPush.color = item.children.color.innerText;
    } catch (error) {
      console.error("item color not found");
    }

    parsedItems.push(itemToPush);
  });
  return parsedItems;
};

orderData = {
  ...orderData,
  orderId: getData("orderId"),
  ifCancelled: "true" === getData("ifCancelled"),
  ifDelivered: "fulfilled" === getData("fullfillmentStatus"),
  financialStatus: getData("financialStatus"),
  orderDate: getData("orderDate"),
  today: getData("today"),
  addresses: getAddresses(),
  orderSummary: getOrderSummary(),
  lineItems: getItems(),
};

root.render(
  // <React.StrictMode>
  <App orderData={orderData} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
