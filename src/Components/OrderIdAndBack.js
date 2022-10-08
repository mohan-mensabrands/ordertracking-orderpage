import React from 'react'
import PropTypes from 'prop-types'

export default function OrderIdAndBack({orderId}) {
    return (
        <div className='orderId-back-button orderTrackingCard'>
            <div className='button-back' onClick={()=> document.getElementById('orderTrackingBackButton').click()}>
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.5L1.5 9L9 1.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div><span> Order {orderId}</span></div>
        </div>
    )
}

OrderIdAndBack.propTypes = {
    orderId: PropTypes.string
}
