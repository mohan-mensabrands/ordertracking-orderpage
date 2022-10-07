import React, { useState } from 'react'
import {ReactComponent as LeftArrow} from '../svg/LeftArrow.svg';
import {ReactComponent as DownArrow} from '../svg/DownArrow.svg';

export default function Addresses({ addressData }) {
  return (
    <div className="addresses orderTrackingCard">
      {
        addressData.map((item) => <Address address={item} />)
      }
    </div>
  )
}

function Address({ address }) {
  const [showAddress, setShowAddress] = useState(address.title === 'shippingAddress' ? true : false);

  return (
    <div className='orderTrackingAddress'>
      <div
        className={address.title}
        onClick={() => setShowAddress(!showAddress)}
      >{address.label}
        <div className="orderTracking-svg">
          {
            showAddress ?
              <DownArrow/>
              :
              <LeftArrow/>
          }
        </div>
      </div>
      {showAddress ?
        <div className={address.title + '-value'}>
          {`${address.value.first_name} ${address.value.last_name}, ${address.value.address1}, ${address.value.address2}, ${address.value.city}, ${address.value.province}, ${address.value.zip}`}
          <div className={address.title + '-phone'}>Mobile: {address.value.phone}</div>
        </div> :
        <></>
      }
    </div>
  )
}
