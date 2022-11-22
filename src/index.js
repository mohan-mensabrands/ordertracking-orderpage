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
      )}, ${getEle("city")}`,
      contact: getEle("phone"),
      state:`${getEle("province")}`,
      pinCode: `${getEle("zip")}`
    };
    toRet.push(sa);
  }
  let ba = billingAddress();
  if(ba === '' && ba !== null && ba !== 'null') add = ba;
  if (add !== null && add !== 'null') {
    let ba = {
      title: "billingAddress",
      label: "Billing Address",
      value: `${getEle("name")}, ${getEle("address1")}, ${getEle(
        "address2"
      )}, ${getEle("city")}`,
      contact: getEle("phone"),
      state:`${getEle("province")}`,
      pinCode: `${getEle("zip")}`
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
  let discountCode = ''
  try {
    discountCode =
      document.getElementsByName("discountCode")[0].innerText;
  } catch (error) {
    console.error("No discount Code found");
  }
  let taxVals = []
  try {
    let taxes = document.getElementsByName('taxValues');
    taxes.forEach((tax)=> {
      taxVals.push({title: `Tax (${tax.children.taxTitle.innerText} ${tax.children.taxRate.innerText} % )`, value:`${tax.children.taxVal.innerText}`})
    })
    // console.log('taxvals', taxVals);
  }catch{
    console.error('No taxes found')
  }

  let mrp = {
    title: "Total Selling Price",
    value:
      parseFloat(raw.total) -
      parseFloat(raw.shipping) +
      parseFloat(raw.discount) 
      //parseFloat(raw.tax)
      ,
  };
  let discount = {title: 'Discount', value: parseFloat(raw.discount)}
  let subTotal = {title: 'Sub Total', value: mrp.value - discount.value}
  let shipping = {title: 'Shipping Charges', value: parseFloat(raw.shipping)}
  let total = {title: 'Total', value: raw.total}
  //let tax = {title: 'Tax', value: raw.tax}
  if(discountCode !== '') {
    discount = {...discount, code : discountCode}
  }
  orderSummary.push(
    mrp, 
    discount, 
    subTotal, 
    shipping, 
    //tax, 
    )
  taxVals.forEach((val)=>orderSummary.push(val))
  orderSummary.push(total)
  return orderSummary;
};

const getItems = () => {
  let parsedItems = [];
  let items = document.getElementsByName("lineItems")[0].childNodes;
  items.forEach((item) => {
    let itemToPush = {
      productLink: "#",
      itemId: "",
      title: "",
      imageUrl: "",
      itemPrice: {
        totalPrice: "",
        finalPrice: "",
        pricePerUnit: ""
      },
      attributes:[],
      trackingLink: ""
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
      itemToPush.itemPrice.pricePerUnit =
        item.children.itemPrice.children.pricePerUnit.innerText;
    } catch (error) {
      console.error("item Final Price not found");
    }

    try {
      itemToPush.productLink = item.children.productLink.href
    } catch (error) {
      console.error("item product link not found");
    }

    let attr = []
    let qty = ''
    try {
      qty = item.children.quantity.innerText;
      attr.push(qty)
    } catch (error) {
      console.error("item qty not found");
    }
    try {
      let att =  item.children[7].children
      for(let attrib of att) {
        attr.push( attrib.innerText)
      }
    } catch (error) {
      console.log('NO attributes in prod');
    }

    try {
      itemToPush.trackingLink = item.children.trackingLink.innerText
    } catch (error) {
      console.log('Tracking Link Not Found!');
    }
    // try {
    //   size = item.children.size.innerText;
    // } catch (error) {
    //   console.error("item size not found");
    // }
    // try {
    //   color = item.children.color.innerText;
    // } catch (error) {
    //   console.error("item color not found");
    // }

    // let attributes = []
    // if(qty && qty !== "") attributes.push({title: 'Qty', value: qty})
    // if(size && size !== "") attributes.push({title: 'Size', value: size})
    // if(color && color !== "") attributes.push({title: 'Color', value: color})
    
    itemToPush.attributes = attr
    parsedItems.push(itemToPush);
  });
  return parsedItems;
};

const getContactDetails = () => {
  try {
    let contactDetails = document.getElementsByName('mensaContactDetails')[0]
    let details = {
      whatsapp: contactDetails.children.whatsapp.innerText,
      email: contactDetails.children.email.innerText,
      phone: contactDetails.children.phone.innerText
    }
    return details;
  } catch (error) {
    console.error('error fetching contact details')
  }
}

orderData = {
  ...orderData,
  orderId: getData("orderId"),
  ifCancelled: "true" === getData("ifCancelled"),
  ifDelivered: false,
  financialStatus: getData("financialStatus"),
  orderDate: getData("orderDate"),
  today: getData("today"),
  addresses: getAddresses(),
  orderSummary: getOrderSummary(),
  lineItems: getItems(),
  contactDetails: getContactDetails()
};

console.log('orderdata', orderData)

root.render(
  // <React.StrictMode>
  <App orderData={orderData} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
