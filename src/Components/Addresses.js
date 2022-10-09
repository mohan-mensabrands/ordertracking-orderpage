import React, { useState } from 'react'
import {LeftArrow} from '../svg'
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
          {address.value}
          <div className={address.title + '-phone'}>Mobile: {address.contact}</div>
        </div> :
        <></>
      }
    </div>
  )
}
