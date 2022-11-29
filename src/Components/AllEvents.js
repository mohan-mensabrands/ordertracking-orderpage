import React, { useEffect, useState, useCallback } from 'react'

import res from '../newres.json'

export default function AllEvents({ orderId, show, onClose }) {
    const [ress, setRess] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async() => {
        const response = await fetch('https://0wc7s8r4h7.execute-api.ap-south-1.amazonaws.com/api/v1/tracking/info/15163103015868');
        const data = await response.json();
        setRess(JSON.parse(data.data.trackingInfoDetail.scans));
        setLoading(false);
    }, []); 

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    // call OMS api
    // use memo
    // set loading till fetch 
    if (show) {
        document.body.classList.add('mensaModalActive')
    } else {
        document.body.classList.remove('mensaModalActive')
    }
    return (
        <div className={show ? "mensaModalWrapper" : ""}>
            <div className='mensaSubeventClosebtn' onClick={onClose}> <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                <path d="M20 12L12 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20 20L12 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </div>
            <div className={show ? 'mensaSubeventContainer' : 'mensaHide'}>
                <div className='mensaSubeventTimeline'>
                    {ress?.map(
                        (event) =>
                            <div className='eventCard'>
                                <SubEvent
                                    date={dateFormat(new Date(event.date))}
                                    location={event.location}
                                    name={event.activity}
                                ></SubEvent>
                            </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const SubEvent = ({ date, name, location, time }) => {
    return (
        <>
            {/* <div className='dot-line'>
                <div className="dot"> </div>
                <div className="line"> </div>
            </div> */}
            <div className="mensaSubeventALDContainer">
                <div className="mensaSubeventName">{name}</div>
                <div className="mensaSubeventLDContainer">
                    <div className="mensaSubeventLocation">{location}</div>
                    <div className="mensaSubeventDate">{date}</div>
                    <div className="mensaSubeventTime">{time}</div>
                </div>
            </div>
        </>
    )
}

const dateFormat = (isoDate) => {
    var options = { weekday: 'long', month: 'short', day: 'numeric' };
    return isoDate.toLocaleDateString("en-US", options)
}
