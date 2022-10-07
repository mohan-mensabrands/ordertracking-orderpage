import React from 'react'

export default function Timeline({ items }) {
    if (!items || items.length < 1) {
        return(
            <></>
        )
    }
    return (
        <div className='timeline orderTrackingCard'>
            {
                items.map((item) => <Event item={item}/>)
            }
        </div>
    )
}


function Event({item}) {

    console.log("logging event ---> ", item)
    let eventClass = "timeline-event orderTracking-para-bold " + item.state
    let dotlineClass = "dot-line " + item.state
    return (
        <div className={eventClass}>
            <div className={dotlineClass}>
                <div className="dot"> </div>
                <div className="line"> </div>
            </div>
            {item.event}
        </div>
    )
}